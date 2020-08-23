from django.shortcuts import render
from django.http import HttpResponseRedirect 
import requests
import os
# Create your views here.

def base(request):
    return render(request,'base.html')


def gardener(request):
    return render(request,'trefle.html')
    # all_garden_items = GardenObject.objects.all()
    # return render(request, 'gardener.html',
    #     {'all_items': all_garden_items})

API_TOKEN = os.environ.get('API_TOKEN') 


def trefle(request): 
    search_result = {}
    if 'q' in request.GET:
        username = request.GET['q']
        url = 'https://trefle.io/api/v1/plants/search%s' % username
        response = requests.get(url)
        search_was_successful = (response.status_code == 200)  # 200 = SUCCESS
        search_result = response.json()
        search_result['success'] = search_was_successful
        search_result['rate'] = {
            'limit': response.headers['X-RateLimit-Limit'],
            'remaining': response.headers['X-RateLimit-Remaining'],
        }
    return render(request, 'trefle.html', {'search_result': search_result})
    # garden_object = {}
    # if 'search' in request.GET:
    #     # search = request.GET.get['search'] 
    #     # search_par = {'q': search, 'token' : API_TOKEN}
    #     # url = "https://trefle.io/api/v1/plants/search%s&token=%s" %(search, API_TOKEN)
    #     url = "https://trefle.io/api/v1/plants/search?q=%27eastern+teaberry%27&token=e8GOvXk9xSCoNQgjLg95RyxkXa1zpPMxv-T2croQ09w"
    #     response = requests.get(url)
    #     garden_object = response.json()
    # return render(request, 'trefle.html', {
    #     'id': garden_object.keys()  
    #     })


# def addItem(request): 
#     id_val = request.POST['id']
#     new_item = GardenObject(id=id_val)
#     new_item.save()
#     return HttpResponseRedirect('/gardener/')


# def home(request):
#     plant ={}
    
#     search_par = {'q': 'eastern teaberry', 'token' : API_TOKEN}

#     is_cached = ('p_dict' in request.session)

#     if not is_cached:
#         ip_address = request.META.get('HTTP_X_FORWARDED_FOR', '')
#         response = requests.get('https://trefle.io/api/v1/plants/search/%s' % ip_address, search_par)
#         request.session['p_dict'] = response.json()
    
#     p_dict = request.session['p_dict']
#     # response = requests.get("https://trefle.io/api/v1/plants/search", search_par)
#     # p_dict = response.json()  
#     # print(p_dict)
#     return render(request, 'gardener.html', {
#         'id': p_dict['data'][0]['id'] 
#     })
 
  