import requests  
import json

# user_in = input('name a plant:')
search_par = {'q': 'eastern teaberry', 'token' : 'e8GOvXk9xSCoNQgjLg95RyxkXa1zpPMxv-T2croQ09w'}

plant_search = requests.get("https://trefle.io/api/v1/plants/search", search_par)

p_dict = plant_search.json() 
id = p_dict['data'][0]['id']  