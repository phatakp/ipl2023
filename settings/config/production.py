
from ._base import *

try:
    from .local import *
    print('Dev Settings')
except ImportError:
    print('Prod settings')
    import os

    import dj_database_url
    import django_heroku
    ALLOWED_HOSTS = ['https://ipl2023.herokuapp.com']
    THIRD_PARTY_APPS += [
        'storages',
    ]
    INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
    DATABASES = {
        'default': dj_database_url.config(
            conn_max_age=600,
        )
    }
    CORS_ALLOWED_ORIGINS = ['https://ipl2023.herokuapp.com']

    # AWS settings
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    AWS_S3_FILE_OVERWRITE = True
    # S3 static settings
    AWS_LOCATION = 'static'
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    django_heroku.settings(locals())
