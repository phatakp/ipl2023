
import os
import sys
from datetime import timedelta
from pathlib import Path

# Pointing to IPL2023 folder
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(os.path.normpath(os.path.join(BASE_DIR, 'apis')))

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG") == "True"

# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    "drf_standardized_errors",
]

LOCAL_APPS = [
    'core.apps.CoreConfig',
    'users.apps.UsersConfig',
    'teams.apps.TeamsConfig',
    'matches.apps.MatchesConfig',
    'predictions.apps.PredictionsConfig',
    'stats.apps.StatsConfig',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'settings.wsgi.application'


# Database
DATABASES = {}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/


STATIC_URL = '/assets/static/'
MEDIA_URL = '/assets/media/'
STATIC_ROOT = BASE_DIR / "assets" / "static"
MEDIA_ROOT = BASE_DIR / "assets" / "media"
STATICFILES_DIRS = [BASE_DIR / 'static']


# User Model
AUTH_USER_MODEL = 'users.UserAccount'

# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    "EXCEPTION_HANDLER": "drf_standardized_errors.handler.exception_handler"
}

# JWT Settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}
JWT_COOKIE_NAME = os.getenv("JWT_COOKIE_NAME")
JWT_COOKIE_SAMESITE = os.getenv("JWT_COOKIE_SAMESITE")
JWT_COOKIE_SECURE = os.getenv("JWT_COOKIE_SECURE") == "True"

# Cors Configuration
CORS_ALLOW_CREDENTIALS = True


# Local Apps Configuration
TEAM_CHOICES = [
    ('CSK', 'Chennai Super Kings'),
    ('DC', 'Delhi Capitals'),
    ('KKR', 'Kolkata Knight Riders'),
    ('MI', 'Mumbai Indians'),
    ('SRH', 'Sunrisers Hyderabad'),
    ('RCB', 'Royal Challengers Bangalore'),
    ('RR', 'Rajasthan Royals'),
    ('PBKS', 'Punjab Kings'),
    ('KOC', 'Kochi Tuskers'),
    ('RPSG', 'Rising Pune Supergiants'),
    ('GL', 'Gujarat Lions'),
    ('GT', 'Gujarat Titans'),
    ('LSG', 'Lucknow Super Giants'),
]

SCHEDULED = 'scheduled'
COMPLETED = 'completed'
ABANDONED = 'abandoned'
MATCH_STATUS = [SCHEDULED, COMPLETED, ABANDONED]

LEAGUE = 'league'
QUALIFIER1 = 'qualifier 1'
QUALIFIER2 = 'qualifier 2'
ELIMINATOR = 'eliminator'
FINAL = 'final'
KNOCKOUT = 'knockout'
MATCH_TYPES = [LEAGUE, QUALIFIER1, QUALIFIER2, ELIMINATOR, FINAL]
STATS_MATCH_TYPES = [LEAGUE, KNOCKOUT]

RUNS = 'runs'
WICKETS = 'wickets'
SUPEROVER = 'superover'
WIN_TYPES = [RUNS, WICKETS, SUPEROVER]

PLACED = 'placed'
DEFAULT = 'default'
WON = 'won'
LOST = 'lost'
NORESULT = 'no-result'
PREDICTION_STATUS_TYPES = [PLACED, DEFAULT, WON, LOST, NORESULT]

MATCH_MIN_STAKE = 30

ALL = 'all'
HOME = 'home'
AWAY = 'away'
LAST10 = 'last10'
BATFIRST = 'batFirst'
STATS_TYPES = [ALL, HOME, AWAY, BATFIRST, KNOCKOUT, LAST10]
