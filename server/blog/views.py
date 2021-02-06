from django.shortcuts import render
from django.http import HttpResponse
posts=[
    {
        'author':'autul',
        'title':'Anime',
        'content':'One Piece',
        'date_posted':'Everyday'
    },
    {
        'author':'shimul',
        'title':'politics',
        'content':'chatro league',
        'date_posted':'February 4'
    }
]
def home(request):
    context={
        'posts':posts,
        'title':'My Blog'
    }
    return render(request,'blog/home.html',context)

def about(request):
    return render(request,'blog/about.html',{'title':'My Blog About'})
