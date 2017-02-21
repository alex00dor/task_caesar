from django.http import JsonResponse, Http404
from .utilts import ceaserCrack, ceaserDecrypt, ceaserEncrypt
from .models import Log

def encrypt(request):
    if request.GET:
        str = request.GET.get('string', None)
        rot = request.GET.get('rot', None)
        if str and rot:
            encrypt_str = ceaserEncrypt(str, rot)
            data = {
                'original': str,
                'encrypt': encrypt_str,
            }
            log = Log(action='en', text=str, result=encrypt_str)
            log.save()
            return JsonResponse(data)
    return Http404

def decrypt(request):
    if request.GET:
        str = request.GET.get('string', None)
        rot = request.GET.get('rot', None)
        if str and rot:
            decrypt_string = ceaserDecrypt(str, rot)
            data = {
                'original': str,
                'decrypt': decrypt_string,
            }
            log = Log(action='de', text=str, result=decrypt_string)
            log.save()
            return JsonResponse(data)
    return Http404