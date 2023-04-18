from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer

# Create your views here.
@csrf_exempt
def questions_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        print("pepe pepe pepe pepe")
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def questions_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == "GET":
        serializer = QuestionSerializer(question)
        return JsonResponse(serializer.data)
    
    if request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(question, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        question.delete()
        return HttpResponse(status=204)


@csrf_exempt
def choices_list(request):
    if request.method == 'GET':
        #questions = Question.objects.all()
        choices = Choice.objects.all()
        #serializer = QuestionSerializer(questions, many=True)
        serializer = ChoiceSerializer(choices, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        #serializer = QuestionSerializer(data=data)
        serializer = ChoiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def choices_detail(request, pk):
    try:
        #question = Question.objects.get(pk=pk)
        choice = Choice.objects.get(pk=pk)
    #except Question.DoesNotExist:
    except Choice.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        #serializer = QuestionSerializer(question)
        serializer = ChoiceSerializer(choice)
        return JsonResponse(serializer.data)

    if request.method == "PUT":
        data = JSONParser().parse(request)
        #serializer = QuestionSerializer(question, data=data)
        serializer = ChoiceSerializer(choice, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        #question.delete()
        choice.delete()
        return HttpResponse(status=204)
