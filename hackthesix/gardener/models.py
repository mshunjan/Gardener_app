from django.db import models

# Create your models here.
import requests  
import json 

class GardenerItem(models.Model):
    name = models.TextField(max_length=140, default='eastern teaberry') 
    # content = models.TextField(default='a plant')

class GardenObject(models.Model):
    objectid = models.CharField(max_length=140, default='1')
 