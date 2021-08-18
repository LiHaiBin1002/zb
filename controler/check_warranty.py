# -*- coding: utf-8 -*-
import requests
import json
import time
import re
import chardet
def h3c(list):
    try:
        nowtime = int(round(time.time() * 1000))
        page = 'serialNumber='+list[5].strip()+'&productNumber=&language=CN&_d='+str(nowtime)+'&mvs=N'
        url = 'http://es.h3c.com/entitlement/query?'+page
        response = requests.get(url)
        json_obj = json.loads(response.text)
        if json_obj['code'] == 200:
            if json_obj['data']['es'][0]['combinedUnitEntitlement']['contractList'][0]['offerList'][0]['appliesTo']['startDate'] and json_obj['data']['es'][0]['combinedUnitEntitlement']['contractList'][0]['offerList'][0]['appliesTo']['endDate']:
                return {'code':200,'startDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['contractList'][0]['offerList'][0]['appliesTo']['startDate'],'endDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['contractList'][0]['offerList'][0]['appliesTo']['endDate']}
            elif json_obj['data']['es'][0]['combinedUnitEntitlement']['overallContractStartDate'] and json_obj['data']['es'][0]['combinedUnitEntitlement']['overallContractEndDate']:
                return {'code':200,'startDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['overallContractStartDate'],'endDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['overallContractEndDate']}
            else:
                return {'code':400}
        else:
            return {'code':400}
    except:
        if json_obj['data']['es'][0]['combinedUnitEntitlement']['warrantyList'][0]['offerList'][0]['appliesTo']['startDate'] and json_obj['data']['es'][0]['combinedUnitEntitlement']['warrantyList'][0]['offerList'][0]['appliesTo']['endDate']:
            return {'code':200,'startDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['warrantyList'][0]['offerList'][0]['appliesTo']['startDate'],'endDate':json_obj['data']['es'][0]['combinedUnitEntitlement']['warrantyList'][0]['offerList'][0]['appliesTo']['endDate']}
        return {'code':400}
def hw(list):
    try:
        nowtime = int(round(time.time() * 1000))
        page = 'barcode='+list[5].strip()+'&language=cn&source=escp&userIp=&buType=1&_='+str(nowtime)
        url = 'https://app.huawei.com/escpportal/services/portal/vyborgTask/findHardWareVyborg?'+page
        response = requests.get(url)
        json_obj = json.loads(response.text)
        if json_obj:
            if json_obj[0]['startDate'] and json_obj[0]['endDate']:
                return {'code':200,'startDate':json_obj[0]['startDate'],'endDate':json_obj[0]['endDate']}
            else:
                return {'code':400}
        else:
            return {'code':400}
    except:
        return {'code':400}
def lenovo(list):
    try:
        page = 'Method=WarrantyConfigSearch&MachineNo='+list[5].strip()+'&categoryid=&CODEName=&SearchNodeCC=' 
        url = 'https://think.lenovo.com.cn/service/handlers/WarrantyConfigInfo.ashx?'+page
        response = requests.get(url)
        json_obj = json.loads(response.text)
        if json_obj['status'] == 200 and json_obj['WarrantyData'][0]['DelayURL'] != 'null':
            if json_obj['WarrantyData'][0]['LaborStartDate'] and json_obj['WarrantyData'][0]['LaborEndDate']:
                return {'code':200,'startDate':json_obj['WarrantyData'][0]['LaborStartDate'],'endDate':json_obj['WarrantyData'][0]['LaborEndDate']}
            else:
                return {'code':400}
        else:
            return {'code':400}
    except:
        return {'code':400}
def ibm(list):
    try:
        serial_num = list[5].strip()
        machine_type = str(list[3].strip().split('(')[1][0:4])
        page = '/mt/'+machine_type+'/sn/'+serial_num+'/uuid/550005QCVB?mediatype=json'
        url = 'https://www.ibm.com/support/sfrest/warranty'+page
        response = requests.get(url)
        if response.status_code == 200:
            json_obj = json.loads(response.text)
            if json_obj['serviceInfo']['uar'] and json_obj['serviceInfo']['wed']:
            # return {'code':200,'startDate':json_obj['upmaInfo']['mstartDate'],'endDate':json_obj['upmaInfo']['mendDate']}
                return {'code':200,'startDate':json_obj['serviceInfo']['uar'],'endDate':json_obj['serviceInfo']['wed']}
            else:
                return {'code':400}
        else:
            return {'code':400}
    except:
        return {'code':400}
def inspur(list):
    try:
        page = 'struts.portlet.action=/portlet/download-front!serverConfig.action&sn='+list[5].strip()+'&src=inspur&language=CN&pageId=2367231&moduleId=1422af3fa6c04edcbede1f68e035fd0f'
        url = 'https://www.inspur.com/eportal/ui?'+page+'&categoryid=&CODEName=&SearchNodeCC='
        response = requests.get(url) 
        if response.status_code == 200:
            json_obj = json.loads(response.text.lstrip('(').rstrip(')'))
            try:
                if json_obj['warranty1'] and json_obj['Date']:
                    return {'code':200,'startDate':json_obj['Date'],'endDate':json_obj['warranty1']}
                else:
                    return {'code':400}
            except: 
                return {'code':400}
    except:
        return {'code':400}
def ruijie(list):
    try:
        page = 'sn='+list[5].strip()+'&openid=oZSCKtyjbIfTCUEdFCIdlv3thMpI&type=1'
        url = 'http://bestservice.ruijie.com.cn/warranty/query?' + page
        response = requests.get(url)
        json_obj = json.loads(response.text)
        if json_obj['status'] == '200' and eval(json_obj['data'])[0]['GuaranteeBeginTime'] != '' and eval(json_obj['data'])[0]['GuaranteeStopTime'] != '':
            start = eval(json_obj['data'])[0]['GuaranteeBeginTime'].split(' ')[0]
            end = eval(json_obj['data'])[0]['GuaranteeStopTime'].split(' ')[0]
            return {'code':200,'startDate':start,'endDate':end}
        else:
            return {'code':400}
    except:
        return {'code':400}
def maipu(list):
    try:
        nowtime = int(round(time.time() * 1000))
        page1 = 'GetBarcode?barcode='+list[5].strip()+'&_='+str(nowtime)
        page2 = 'AddBarcodeWarranty?barcode='+list[5].strip()+'&_='+str(int(str(nowtime))+1)
        page3 = 'GetWarrantyList?model=&page=1&pageSize=15&_='+str(int(str(nowtime))+2)
        url1 = 'http://repair.maipu.cn/CustomerRepair/'+page1
        url2 = 'http://repair.maipu.cn/CustomerRepair/'+page2
        url3 = 'http://repair.maipu.cn/CustomerRepair/'+page3
        response1 = requests.get(url1)
        json_obj1 = json.loads(response1.text)
        if json_obj1['State'] and json_obj1['Data']['service_date'] != '':
            response2 = requests.get(url2)
            headers = {'Cookie': response2.headers['Set-Cookie'].split(';')[0]}
            json_obj2 = json.loads(response2.text)
            if json_obj2['State']:
                # s=requests.session()
                # response3 = s.get(url3,headers=headers)
                response3 = requests.get(url3,headers=headers)
                json_obj3 = json.loads(response3.text)
                if json_obj3['State'] and json_obj3['Data'] != []:
                    start = json_obj1['Data']['service_date'].split(' ')[0]
                    end = json_obj3['Data'][0]['ExpiredDate'].split(' ')[0]
                    return {'code':200,'startDate':start,'endDate':end}
                else:
                    return {'code':400}
            else:
                return {'code':400}
        else:
            return {'code':400}
    except:
        return {'code':400}

def check(line_list):
    try:
        result = []
        if len(line_list) >= 7:
            manufacturer = line_list[1].strip().lower().encode("GBK","ignore") #厂商
            type1 = line_list[2].encode("GBK","ignore")
            if manufacturer == '华为':
                result = hw(line_list)
            elif manufacturer == 'h3c'or (manufacturer == 'hpe' and type1 == '服务器' ):
                result = h3c(line_list)
            elif  manufacturer == '联想':
                result = lenovo(line_list)
            elif manufacturer == 'ibm' or manufacturer == '浪商':
                result = ibm(line_list)
            elif manufacturer == '浪潮':
                result = inspur(line_list)
            elif manufacturer == '锐捷':
                result = ruijie(line_list)
            elif manufacturer == '迈普':
                result = maipu(line_list)
            # if manufacturer == 'ibm':
                # result = ibm(line_list)
            else:
                result = {'code':500}
            if result['code'] == 200:
                line_list.append(result['startDate'])
                line_list.append(result['endDate'])
            else:
                line_list.append('0/0/0')
                line_list.append('0/0/0')
            return line_list
        else:
            line_list.append('0/0/0')
            line_list.append('0/0/0')
            return line_list
    except Exception as e:
        print e
        line_list.append('0/0/0')
        line_list.append('0/0/0')
        return line_list
        
# if __name__ == '__main__':
    # check()