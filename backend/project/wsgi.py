# transcript_bot/wsgi.py

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'transcript_bot.settings')

application = get_wsgi_application()
