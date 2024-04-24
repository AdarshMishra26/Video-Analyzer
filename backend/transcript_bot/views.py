from django.http import JsonResponse
from django.shortcuts import render
from .transcript_bot import TranscriptBot

bot = TranscriptBot()

def index(request):
    if request.method == 'POST':
        video_url = request.POST.get('video_url')
        video_id = bot.get_video_id(video_url)
        transcript = bot.fetch_and_fit_transcript(video_id)
        bot.save_transcript_to_file(video_id)
        return render(request, 'chat.html')
    return render(request, 'index.html')

def chat(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input')
        transcript_file = open(f"{bot.get_video_id(request.POST.get('video_url'))}_transcript.txt", 'r', encoding='utf-8').read()
        response = bot.generate_response(user_input, transcript_file)
        return JsonResponse({'response': response})
