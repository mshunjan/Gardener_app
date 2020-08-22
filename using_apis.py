import requests  
import json 

API_TOKEN = 'e8GOvXk9xSCoNQgjLg95RyxkXa1zpPMxv-T2croQ09w'

def __getPlantIdByName(name):
    search_par = {'q': name, 'token' : API_TOKEN}

    plant_search = requests.get("https://trefle.io/api/v1/plants/search", search_par)

    p_dict = plant_search.json() 
    return p_dict['data'][0]['id']  


def __getPlantDetailsById(id):
    retrieve_par = {'token' : API_TOKEN}
    plant_retrieve = requests.get("https://trefle.io/api/v1/plants/{}".format(id), retrieve_par)

    plant = plant_retrieve.json()['data']

    return {
        'id': plant['id'],
        'common_name': plant['common_name'],
        'scientific_name': plant['scientific_name'],
        'isVegetable': plant['vegetable'],
        'image_url': plant['image_url']
    }

def getPlantDetailsByName(name):
    id = __getPlantIdByName(name)
    details = __getPlantDetailsById(id)

    print(details)
    return details

