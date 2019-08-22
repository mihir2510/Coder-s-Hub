from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def register(request):
    return render(request, 'users/register.html')

def login(request):
    return render(request, 'users/login.html')    