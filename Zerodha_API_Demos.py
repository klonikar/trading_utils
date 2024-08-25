# -----------------------------------------------------------------------------------#
# 1. Manual Login
# 2. Automatic Login using Selenium
# -----------------------------------------------------------------------------------#
from kiteconnect import KiteConnect
from pprint import pprint
import logging
from kiteconnect import KiteTicker
import pandas
import datetime
import time
import threading
import requests

######PIVOT POINTS##########################
####################__INPUT__#####################
isEnd = False



#  Set your Account Details Here
api_key = "2s0zmezkwa18y5cr"
secret_key = "549i6ihfyddlmtc5cpg1mwwzipw3d7v8"
access_token = "bJ13422k5NMa65gTlIDxwwsJCNhDP0Un"

#microsoft visual C++ installed.
#pip install KiteConnect
#pip install Twisted

#api_key = autoLoginClass.api_key()
#secret_key = autoLoginClass.secret_key()

kc = KiteConnect(api_key=api_key)
kc.set_access_token(access_token)
print("I am here")

stock="NIFTY" # BANKNIFTY OR NIFTY
otm = 500  #If you put -100, that means its 100 points ITM.
SL_percentage = 0.4
target_percentage = 1.2
yesterday_closing_price = 17530


expiry ={
    "year": "23",
    "month": "FEB",
    "day": "09",
    #YYMDD  22O06  22OCT
}

clients = [
    {
        "broker": "zerodha",
        "userID": "US3111",
        "apiKey": "",
        "accessToken": "",
        "qty" : 50
    }
]

if stock == "BANKNIFTY":
        name = "NSE:"+"NIFTY BANK"
elif stock == "NIFTY":
        name = "NSE:"+"NIFTY 50"
#TO get feed to Nifty: "NSE:NIFTY 50" and banknifty: "NSE: NIFTY BANK"


intExpiry=expiry["year"]+expiry["month"]+expiry["day"]  
print(intExpiry)
bnf_ltp = kc.ltp("NSE:NIFTY BANK")["NSE:NIFTY BANK"]['last_price']
nf_ltp = kc.ltp("NSE:NIFTY 50")["NSE:NIFTY 50"]['last_price']
print("BANK NIFTY LTP is", bnf_ltp)
print("NIFTY 50 LTP is", nf_ltp)
bnf_closest_strike=40000
nf_closest_strike=17000

bnf_closest_strike = int(round((bnf_ltp/100), 0)*100)
print("BANK NIFTY Closest Strike: ", bnf_closest_strike)

nf_closest_strike = int(round((nf_ltp/50), 0)*50)
print("NIFTY 50 Closest Strike:", nf_closest_strike)

#print(kc.instruments("NFO"))
nfo_ltp = kc.ltp("NFO:NIFTY23FEB18200PE")
infy_ltp = kc.ltp("NSE:INFY")
print("NIFTY18200PE FEB Monthly Expiry Quote is", nfo_ltp)
nfo_ltp2 = kc.ltp("NFO:NIFTY2320917500PE")
nfo_ltp3 = kc.ltp("NFO:NIFTY2320917000PE")
print("NIFTY17500PE FEB 09 Weekly Expiry Quote is", nfo_ltp2)
print("NIFTY17000PE FEB 09 Weekly Expiry Quote is", nfo_ltp3)
print("INFOSYS Quote is", infy_ltp)

#print("BANK NIFTY LTP is", kc.quote("NSE:NIFTY BANK"))
# print(kc.instruments("NFO"))
# print(kc.orders())
#print("NIFTY 50 Quote is", kc.quote("NSE:NIFTY 50"))
#print("My Zerodha Profile:", kc.profile())

"""
try: 
    ltp = kc.ltp("NFO:NIFTY23JAN2518200PE")
    print("NIFTY 18100 PE Quote is", ltp)
except Exception as e:
    print("NFO:NIFTY25JAN2518100PE", "Failed : {} ".format(e))
"""