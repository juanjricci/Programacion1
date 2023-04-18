from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Question
from .serializers import QuestionSerializer
# Create your views here.

@csrf_exempt
def questions_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        # print("pepe pepe pepe pepe")
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

