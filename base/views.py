from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages as django_messages
from django.db.utils import OperationalError
from items.models import Item 
from conversation.models import Conversation 
from .forms import MessageForm
from .models import Message

def base(request):
    # Initialize all counts with default values
    counts = {
        'users_count': 0,
        'active_users_count': 0,
        'items_count': 0,
        'conversations_count': 0
    }

    User = get_user_model()
    
    try:
        # Safely get all counts only if tables exist
        counts['users_count'] = User.objects.count()
        counts['active_users_count'] = User.objects.filter(is_active=True).count()
        counts['items_count'] = Item.objects.count()
        counts['conversations_count'] = Conversation.objects.count()
    except OperationalError as e:
        # Log error if needed (uncomment to enable logging)
        # import logging
        # logger = logging.getLogger(__name__)
        # logger.warning(f"Database tables not ready: {e}")
        pass  # Use default values when tables don't exist

    # Handle message form submission
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            try:
                Message.objects.create(
                    phone=form.cleaned_data['phone'],
                    message=form.cleaned_data['message']
                )
                django_messages.success(request, 'Message sent successfully!')
                return redirect('base:index')
            except OperationalError:
                django_messages.error(request, 'Database not ready. Please try again later.')
    else:
        form = MessageForm()

    # Pass all data to the template
    context = {
        **counts,  # Unpack all counts
        'form': form,
    }
    return render(request, 'base/index.html', context)

def message_list(request):
    try:
        all_messages = Message.objects.all().order_by('-created_at')
    except OperationalError:
        all_messages = []
    
    return render(request, 'base/messages.html', {'messages': all_messages})

def about_us(request):
    return render(request, 'base/about_us.html')

def admin_links(request):
    return render(request, 'base/admin_links.html')

def terms(request):
    return render(request, 'base/terms.html')