#from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Question, Choice

#class ChoiceSerializer(serializers.HyperlinkedModelSerializer):
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'choice_text', 'votes', 'question']


#class QuestionSerializer(serializers.HyperlinkedModelSerializer):
class QuestionSerializer(serializers.ModelSerializer):
    choice_set = ChoiceSerializer(many=True, required=False)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'pub_date', 'choice_set']



