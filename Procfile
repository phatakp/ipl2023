release: sh -c "python manage.py migrate && python manage.py clean_html"
web: gunicorn settings.wsgi --timeout 15 --keep-alive 5 --log-level debug --log-file -