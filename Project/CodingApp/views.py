from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

#def home(request):
#    return HttpResponse('<h1>gdhSdgkS</h1>')


def home(request):
    return render(request, 'CodingApp/index.html')    