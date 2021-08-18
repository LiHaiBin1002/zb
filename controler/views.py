# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.http import JsonResponse
# from controler.models import User,Project,work,Duty,Sale,Worktype,Check,Updatecontent,Pro_report,Pro_update,Archive,Equip_prod,Equip_regist,Equip_regist_prod,Personnel_input,Checkmonth,Sharing_file
from controler.models import *
from django.http import FileResponse
# 
import sys
import xlrd
import platform
import xlwt
from xlwt import *
import time
import os
import zipfile
import shutil #移动文件
import calendar
import chardet
import math

import check_warranty

from mongoengine.queryset.visitor import Q
from mongoengine import *
connect('test',host='10.30.42.256', port=27017) #连接mongodb数据库
def login(request):
    return render(request,'login.html')
def index(request):
    return render(request,'index.html')
# time_c = time.strftime('%Y.%m.%d',time.localtime(time.time()-2592000))#30天之前的日期
# projects = Project.objects.filter(workdate__gte = time_c).order_by('-workdate')
# print time.strftime('%Y.%m.%d %X',time.localtime(time.time()))#30天之前的日期

#登录//这里逻辑有问题不是我写的，能正常使用，我不管了
@csrf_exempt
def logins(request):
    try:
        dict_json = json.loads(request.POST['data'])
        u = dict_json['username']
        p = dict_json['password']
        try:
            user = User.objects.filter(username=dict_json['username']
                                ,password=dict_json['password']).first()
            if user:
                sessionid = 'session'+str(user.id)
                role = user.user_role
                if p == user.password:
                    request.session[sessionid] = u
                    request.session['is_login'] = True
                    request.session.set_expiry(0)
                if role == '1' or role == 1:
                    if user.status == '离职':
                        return JsonResponse({'result':-2,'data':'该员工不存在'})
                    else: 
                        return JsonResponse({'result':1,'data':role})
                elif role == '2' or role == 2:
                    if user.status == '离职':
                         return JsonResponse({'result':-2,'data':'该员工不存在'})
                    else:
                        return JsonResponse({'result':1,'data':role})
                elif user.status == '离职':
                        return JsonResponse({'result':-2,'data':'该员工不存在'})
                else:
                    return JsonResponse({'result':1,'data':role})
            else:
                return JsonResponse({'result': 0, 'data': '用户名或密码有误'})

        except Exception as e:
            print(e)
            return 0

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '用户名或密码有误'})

#添加用户
@csrf_exempt
def add_user(request):
    try:
        datas = json.loads(request.POST['data'])
        try:
            user = User.objects.filter(username=datas['username'].replace(' ','')).first()
            if user:
                return JsonResponse({'result':-1,'data':'该用户已存在'})
            else:
                user = User(username=datas['username'].replace(' ',''),
                            real_name = datas['firstname'].replace(' ',''),
                            password=datas['password'],
                            level=datas['level'],
                            man_type=datas['type'],
                            status=datas['status'],
                            user_role=datas['role'],
                            position=datas['position'])
                user.save()
                return JsonResponse({'result':1,'data':'用户添加成功'})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询用户失败'})
    except Exception as e:
        print(e)
        return JsonResponse({'result':0,'data':''})

#查看所有员工信息
@csrf_exempt
def display_user(request):
    try:
        if request.session.get('is_login', None):
            users_info = User.objects.all()
            if users_info:
                data = []
                for user_info in users_info:
                    if user_info.username != 'Administrator':
                        data.append({
                            'id': str(user_info.id),
                            'username': user_info.username,
                            'firstname': user_info.real_name,
                            'password': user_info.password,
                            'level': user_info.level,
                            'type': user_info.man_type,
                            'status': user_info.status,
                            'role': user_info.user_role,
                            'position': user_info.position,
                        })
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '查询失败'})

#删除员工信息
@csrf_exempt
def del_user(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            user = User.objects.get(id=data['id'])
            if user:
                project = Project.objects.filter(membername=user.username)
                project.delete()
                user.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '该用户不存在'})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询用户失败'})


    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})

#查看一个员工信息
@csrf_exempt
def display_this_user(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            if request.session.get('is_login', None):
                user = User.objects.get(id=data['id'])
                if user:
                    data = {
                        'id': str(user.id),
                        'username': user.username,
                        'firstname': user.real_name,
                        'password': user.password,
                        'level': user.level,
                        'type' : user.man_type,
                        'status': user.status,
                        'role': user.user_role,
                        'position': user.position,
                    }
                    return JsonResponse({'result': 1, 'data': data})
                else:
                    return JsonResponse({'result': 0, 'data': '该用户不存在'})
            else:
                return render(request, 'login.html')



        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询用户失败'})


    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#修改用户
@csrf_exempt
def update_user(request):
    try:
        data = json.loads(request.POST['data'])

        try:
            user = User.objects.get(id=data['id'])
            if user:
                user.username = data['username']
                user.real_name = data['firstname']
                user.password = data['password']
                user.level = data['level']
                user.man_type = data['type']
                user.status = data['status']
                user.user_role = data['role']
                user.position = data['position']
                user.save()

                return JsonResponse({'result':1,'data':'修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': '该用户不存在'})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询用户失败'})

    except Exception as e:
        return JsonResponse({'result': 0, 'data': ''})

#冻结用户
@csrf_exempt
def frozen_user(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            user = User.objects.get(id=data['id'])
            if user:
                user.status = "离职"
                user.save()
                return JsonResponse({'result':1,'data':'修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': '该用户不存在'})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询用户失败'})
    except Exception as e:
        return JsonResponse({'result': 0, 'data': ''})

#添加项目
@csrf_exempt
def add_project(request):
    try:
        data = json.loads(request.POST['data'])
        work_info = work(
            xuhao=data['xuhao'],
            clientname=data['clientname'],
            contractno=data['contractno'],
            projectname=data['projectname'],
            type = data['type'],
            caigouzhuangtai = '未采购',
            arrival_status = '未到货',
            money = '0',
            state = '进行中',
            # shishiqingkuang = '未实施',
            guidangqingkuang = '0.00',
            huowuqingdian = '未满足',
            chuyanbaogao = '未满足',
            zhongyanbaogao = '未满足',
            dutyname=data['dutyname'],
            salename=data['salename'],
            yikaipiao = '0.00',
            yishoukuan = '0.00',
            remark = '',
            department=data['department'],
            latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())),
            latestupdatecontent = ''
        )
        work_info.save()
        return JsonResponse({'result': 1, 'data': '添加成功'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#删除项目
@csrf_exempt
def del_project(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            work_info = work.objects.get(id=data['id'])
            if work_info:
                work_info.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})

#更新项目元数据
@csrf_exempt
def update_project(request):
    try:
        data = json.loads(request.POST['data'])
        # print data['dutyname']
        try:
            work_info = work.objects.get(id=data['id'])
            if work_info:
                work_info.xuhao = data['xuhao']
                work_info.contractno = data['contractno']
                work_info.projectname = data['projectname']
                work_info.type = data['type']
                work_info.clientname = data['clientname']
                work_info.dutyname = data['dutyname']
                work_info.salename = data['salename']
                work_info.department = data['department']
                work_info.save()

                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        return JsonResponse({'result': 0, 'data': ''})

#查看所有项目
@csrf_exempt
def display_project(request):
    try:
        if request.session.get('is_login', None):
            works_info = work.objects.all().order_by('-xuhao')
            try:
                if works_info:
                    data = []
                    for work_info in works_info:
                        data.append({
                            'id': str(work_info.id),
                            'xuhao': work_info.xuhao,
                            'clientname': work_info.clientname,
                            'contractno': work_info.contractno,
                            'type': work_info.type,
                            'projectname': work_info.projectname,
                            'cont_status': work_info.cont_status,
                            'cont_name': work_info.cont_name,
                            'money': work_info.money,
                            'state': work_info.state,
                            'caigouzhuangtai': work_info.caigouzhuangtai,
                            'arrival_status': work_info.arrival_status,
                            'shishiqingkuang': work_info.shishiqingkuang,
                            'guidangqingkuang': work_info.guidangqingkuang,
                            'huowuqingdian': work_info.huowuqingdian,
                            'chuyanbaogao': work_info.chuyanbaogao,
                            'zhongyanbaogao': work_info.zhongyanbaogao,
                            'dutyname': work_info.dutyname,
                            'salename': work_info.salename,
                            'yikaipiao': work_info.yikaipiao,
                            'yishoukuan': work_info.yishoukuan,
                            'remark': work_info.remark,
                            'department': work_info.department,
                            'latestupdate': str(work_info.latestupdate).replace('T',' '),
                            'latestupdatecontent': work_info.latestupdatecontent,
                        })
                    return JsonResponse({'result': 1, 'data': data})
                else:
                    datas = []
                    return JsonResponse({'result': 1, 'data': datas})
            except Exception as e:
                print(e)
        else:
            return render(request, 'login.html')


    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '查询失败'})

#查看单个项目
@csrf_exempt
def display_this_project(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            if request.session.get('is_login', None):
                work_info = work.objects.get(id=data['id'])
                if work_info:
                    data = {
                        'id': str(work_info.id),
                        'xuhao': work_info.xuhao,
                        'clientname': work_info.clientname,
                        'contractno': work_info.contractno,
                        'type': work_info.type,
                        'projectname': work_info.projectname,
                        'money': work_info.money,
                        'state': work_info.state,
                        'caigouzhuangtai': work_info.caigouzhuangtai,
                        'arrival_status': work_info.arrival_status,
                        'guidangqingkuang': work_info.guidangqingkuang,
                        'huowuqingdian': work_info.huowuqingdian,
                        'chuyanbaogao': work_info.chuyanbaogao,
                        'zhongyanbaogao': work_info.zhongyanbaogao,
                        'dutyname': work_info.dutyname,
                        'salename': work_info.salename,
                        'yikaipiao': work_info.yikaipiao,
                        'yishoukuan': work_info.yishoukuan,
                        'remark': work_info.remark,
                        'department': work_info.department,
                        'latestupdatecontent': work_info.latestupdatecontent,
                    }
                    return JsonResponse({'result': 1, 'data': data})
                else:
                    return JsonResponse({'result': 0, 'data': ''})
            else:
                return render(request, 'login.html')
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})


#添加员工项目内容
@csrf_exempt
def add_work_content(request):
    try:
        data = json.loads(request.POST['data'])
        # work_info = work.objects.get(contractno = data['contractno'])
        work_info = work.objects.get(projectname = data['projectname'],contractno = data['contractno'])
        if work_info:
            s_flag = ''
            if work_info.state == '进行中':
                s_flag = 'S1'
            else:
                s_flag = 'S0'
            project = Project(
                contractno=data['contractno'],
                projectname=data['projectname'],
                clientname=data['clientname'],
                dutyname=data['dutyname'],
                salename=data['salename'],
                department=data['department'],
                workdate=data['workdate'],
                endtime=data['endtime'],
                province=data['province'],
                city=data['city'],
                county=data['county'],
                workload=data['workload'],
                othercost=data['othercost'],
                fixedcost=data['fixedcost'],
                worktype=data['worktype'],
                workitem=data['workitem'],
                workcontent=data['workcontent'],
                toresult=data['toresult'],
                membername=data['membername'],
                memberid=data['memberid'],
                request=data['request'],
                level=data['level'],
                remark=data['remark'],
                flag=data['flag'],
                returnreasons='',
                state_flag=s_flag
            )
            project.save()
            return JsonResponse({'result': 1, 'data': '添加成功'})
        else:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#显示单个员工项目内容
@csrf_exempt
def display_work_content(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            if request.session.get('is_login', None):
                projects = Project.objects.filter(Q(memberid=data['memberid'])).order_by('-workdate')
                # projects = Project.objects.filter(Q(workdate__gte = time_c)&Q(memberid=data['memberid'])).order_by('-workdate')
                if projects:
                    datas = []
                    for project in projects:
                        datas.append({
                            'id': str(project.id),
                            'contractno': project.contractno,
                            'projectname': project.projectname,
                            'clientname': project.clientname,
                            'dutyname': project.dutyname,
                            'salename': project.salename,
                            'department': project.department,
                            'workdate': project.workdate,
                            'endtime': project.endtime,
                            'province': project.province,
                            'city': project.city,
                            'county': project.county,
                            'workload': project.workload,
                            'othercost': eval(project.othercost),
                            'fixedcost': project.fixedcost,
                            'worktype': project.worktype,
                            'workitem': project.workitem,
                            'workcontent': project.workcontent,
                            'toresult': project.toresult,
                            'membername': project.membername,
                            'memberid': project.memberid,
                            'request': project.request,
                            'level': project.level,
                            'flag': project.flag,
                        })

                    return JsonResponse({'result': 1, 'data': datas})
                else:
                    data_result = []
                    return JsonResponse({'result': 1, 'data': data_result})
                

            else:
                return render(request, 'login.html')


        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})


    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#修改项目进度
@csrf_exempt
def updateTrack(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            work_info = work.objects.get(id=data['id'])
            if work_info:
                time1 = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                work_info.state = data['state']
                work_info.caigouzhuangtai = data['caigouzhuangtai']
                work_info.arrival_status = data['arrival_status']
                # work_info.shishiqingkuang = data['shishiqingkuang']
                work_info.guidangqingkuang = data['guidangqingkuang']
                work_info.huowuqingdian = data['huowuqingdian']
                work_info.chuyanbaogao = data['chuyanbaogao']
                work_info.zhongyanbaogao = data['zhongyanbaogao']
                work_info.yikaipiao = data['yikaipiao']
                work_info.yishoukuan = data['yishoukuan']
                work_info.remark = data['remark']
                work_info.latestupdatecontent = data['updatacontent']
                work_info.latestupdate = time1
                work_info.save()
                
                content_info = Updatecontent.objects.filter(contractno=work_info.contractno).first()
                time2 = str(time1)
                if content_info:
                    content_info.content = content_info.content+'；'+ time2 + '，'  + data['updatacontent']
                    content_info.save()
                else:
                    content_info = Updatecontent(
                        contractno = work_info.contractno,
                        content = time2 + data['updatacontent']
                    )
                    content_info.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
                # result = {'result': 1, 'data': '修改成功'}
            else:
                return JsonResponse({'result': 0, 'data': ''})
                # result = {'result': 0, 'data': ''}
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
        
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#项目负责人修改项目进度的备注栏
def updateTrack_remark(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            work_info = work.objects.get(id=data['id'])
            if work_info:
                time1 = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                work_info.remark = data['remark']
                work_info.latestupdatecontent = data['updatacontent']
                work_info.latestupdate = time1
                work_info.save()
                
                content_info = Updatecontent.objects.filter(contractno=work_info.contractno).first()
                time2 = str(time1)
                if content_info:
                    content_info.content = content_info.content+'；'+ time2 + '，'  + data['updatacontent']
                    content_info.save()
                else:
                    content_info = Updatecontent(
                        contractno = work_info.contractno,
                        content = time2 + data['updatacontent']
                    )
                    content_info.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
                # result = {'result': 1, 'data': '修改成功'}
            else:
                return JsonResponse({'result': 0, 'data': ''})
                # result = {'result': 0, 'data': ''}
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#项目负责人修改项目进度并提交项目周报    
@csrf_exempt
def duty_updateTrack_AND_add_pro_report(request):
    try:
        data = json.loads(request.POST['data'])
        pro_update = data['pro_update']
        pro_report = data['pro_report']
        try:
            flag = False
            if pro_report[0]==None and pro_update[0]!=None:
                update_info = Pro_update.objects.filter(serial_number = pro_update[0]['serial_number']).first()
                if update_info:
                    flag = True
            elif pro_report[0]!=None and pro_update[0]==None:
                report_info = Pro_report.objects.filter(serial_number = pro_report[0]['serial_number']).first()
                if report_info:
                    flag = True
            else:
                update_info = Pro_update.objects.filter(serial_number = pro_update[0]['serial_number']).first()
                report_info = Pro_report.objects.filter(serial_number = pro_report[0]['serial_number']).first()
                if update_info or report_info:
                    flag = True
            if flag:
                return JsonResponse({'result': 2, 'data': '数据已存在'})
            else:
                try:
                    if pro_update[0]!=None:
                        for i in pro_update:
                            work_info = work.objects.filter(Q(contractno=i['contractno'])).first()
                            if work_info:
                                time1 = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                                work_info.guidangqingkuang = i['archiving_situation']
                                work_info.huowuqingdian = i['cargo_inventory']
                                work_info.chuyanbaogao = i['preliminary_report']
                                work_info.zhongyanbaogao = i['final_report']
                                work_info.yikaipiao = i['invoiced']
                                work_info.yishoukuan = i['receivable']
                                work_info.latestupdatecontent = i['updatacontent']
                                work_info.latestupdate = time1
                                work_info.save()
                                content_info = Updatecontent.objects.filter(Q(contractno=i['contractno'])).first()
                                time2 = str(time1)
                                if content_info:
                                    content_info.content = content_info.content+'；'+ time2 + '，'  + i['updatacontent']
                                    content_info.save()
                                else:
                                    content_info = Updatecontent(
                                        contractno = work_info.contractno,
                                        content = time2 + i['updatacontent']
                                    )
                                    content_info.save()
                            update = Pro_update(
                                username = i['username'],
                                serial_number = i['serial_number'],
                                pro_update_order = i['pro_update_order'],
                                contractno = i['contractno'],
                                projectname = i['projectname'],
                                archiving_situation = i['archiving_situation'],
                                cargo_inventory = i['cargo_inventory'],
                                preliminary_report = i['preliminary_report'],
                                final_report = i['final_report'],
                                invoiced = i['invoiced'],
                                receivable =i['receivable']
                            ) 
                            update.save()
                    if pro_report[0]!=None:
                        for j in pro_report:
                            report = Pro_report(
                                username = j['username'],
                                serial_number = j['serial_number'],
                                pro_report_order = j['pro_report_order'],
                                contractno = j['contractno'],
                                projectname = j['projectname'],
                                last_week_trends =j['last_week_trends'],
                                next_week_plan = j['next_week_plan']
                            )
                            report.save()
                    return JsonResponse({'result': 1, 'data': '更新成功'})
                except Exception as e:
                    print (e)
                    return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
                print (e)
                return JsonResponse({'result': 0, 'data': ''})
            
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
    
#查看提交的项目周报
@csrf_exempt
def display_project_report(request):
    try:
        if request.session.get('is_login', None):
            try:
                data = json.loads(request.POST['data'])
                pro_update = []
                pro_report = []
                if len(data)==0:
                    update = Pro_update.objects.all().order_by('-serial_number','pro_update_order')
                    report = Pro_report.objects.all().order_by('-serial_number','pro_report_order')
                else: 
                    update = Pro_update.objects.filter(username = data['username']).order_by('-serial_number','pro_update_order')
                    report = Pro_report.objects.filter(username = data['username']).order_by('-serial_number','pro_report_order')
                if len(update) or len(report):
                    for i in update:
                        pro_update.append({
                            'username' : i.username,
                            'serial_number' : i.serial_number,
                            'pro_update_order' : i.pro_update_order,
                            'contractno' : i.contractno,
                            'projectname' : i.projectname,
                            'archiving_situation' : i.archiving_situation,
                            'cargo_inventory' : i.cargo_inventory,
                            'preliminary_report' : i.preliminary_report,
                            'final_report' : i.final_report,
                            'invoiced' : i.invoiced,
                            'receivable' : i.receivable,
                        })
                    for j in report:
                        pro_report.append({
                            'username' : j.username,
                            'serial_number' : j.serial_number,
                            'pro_report_order' : j.pro_report_order,
                            'contractno' : j.contractno,
                            'projectname' : j.projectname,
                            'last_week_trends' : j.last_week_trends,
                            'next_week_plan' : j.next_week_plan,
                        })
                    return JsonResponse({'result': 1, 'data': {'pro_update':pro_update,'pro_report':pro_report}})
                else: 
                    return JsonResponse({'result': 0, 'data': ''})
            except Exception as e:
                print (e)
                return JsonResponse({'result': 0, 'data': ''})

        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})      

#删除项目周报
@csrf_exempt
def del_project_report(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            updates = Pro_update.objects.filter(serial_number = data['num'])
            reports = Pro_report.objects.filter(serial_number = data['num'])
            if updates:
                for update in updates:
                    update.delete()
            if reports:
                for report in reports:
                    report.delete()
            return JsonResponse({'result':1,'data':'删除成功'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#查找某项目最近一次修改的数据
@csrf_exempt
def select_last_pro_update(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            update_info = work.objects.filter(contractno=data['contractno']).first()
            if update_info:
                data = {
                    'archiving_situation':update_info.guidangqingkuang, 
                    'cargo_inventory':update_info.huowuqingdian,
                    'preliminary_report': update_info.chuyanbaogao,
                    'final_report' :update_info.zhongyanbaogao,
                    'invoiced' :update_info.yikaipiao,
                    'receivable': update_info.yishoukuan
                }
                return JsonResponse({'result': 1, 'data': data})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询失败'})

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
 
#查找某项目最近一次的项目周报记录
def  select_last_pro_report(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            report_info = Pro_report.objects.filter(contractno=data['contractno']).order_by('-serial_number').first()
            if report_info:
                data = {
                    'next_week_plan' : report_info.next_week_plan
                }
                return JsonResponse({'result': 1, 'data': data})
            else:
                return JsonResponse({'result': 0, 'data': '该项目未提交过周报'})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': '查询失败'})

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#leader身份查看所有项目内容
@csrf_exempt
def display_all_work_content(request):
    global get_projects
    try:
        if request.session.get('is_login', None):
            # projects = Project.objects.all().order_by('-workdate')
            projects = Project.objects.filter(Q(flag = "0")|Q(flag = "1")).order_by('-workdate')
            # print (len(projects))
            # projects = Project.objects.filter(Q(workdate__gte = time_c)&(Q(flag = "0")|Q(flag = "1"))).order_by('-workdate')
            get_projects = projects
            if projects:
                datas = []
                for project in projects:
                    datas.append({
                        'id': str(project.id),
                        'contractno': project.contractno,
                        'projectname': project.projectname,
                        'clientname': project.clientname,
                        'dutyname': project.dutyname,
                        'salename': project.salename,
                        'department': project.department,
                        'workdate': project.workdate,
                        'endtime':project.endtime,
                        'province': project.province,
                        'city': project.city,
                        'county': project.county,
                        'workload': project.workload,
                        'othercost': eval(project.othercost),
                        'fixedcost': project.fixedcost,
                        'worktype': project.worktype,
                        'workitem': project.workitem,
                        'workcontent': project.workcontent,
                        'toresult': project.toresult,
                        'membername': project.membername,
                        'memberid': project.memberid,
                        'request': project.request,
                        'level':project.level
                    })
                return JsonResponse({'result': 1, 'data': datas})
            else:
                data_result = []
                return JsonResponse({'result': 1, 'data': data_result})

        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
@csrf_exempt
def display_all_work_content_query(request):
    try:
        data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
        # print data
        current_page = data["current_page"]
        starttime = data["starttime"]
        endtime = data["endtime"]
        province = data["province"]
        city = data["city"]
        contractno = data["contractno"]
        projectname = data["projectname"]
        clientname = data["clientname"]
        worktype = data["worktype"]
        workitem = data["workitem"]
        salename = data["salename"]
        department = data["department"]
        dutyname = data["dutyname"]
        membername = data["membername"]
        flags = data["flag"]
        list_i = []
        list_j = []
        if province != "":
            list_i.append("province")
            list_j.append(province)
        if city != "":
            list_i.append("city")
            list_j.append(city)
        if contractno != "":
            list_i.append("contractno")
            list_j.append(contractno)
        if projectname != "":
            list_i.append("projectname")
            list_j.append(projectname)
        if clientname != "":
            list_i.append("clientname")
            list_j.append(clientname)
        if worktype != "":
            list_i.append("worktype")
            list_j.append(worktype)
        if workitem != "":
            list_i.append("workitem")
            list_j.append(workitem)
        if salename != "":
            list_i.append("salename")
            list_j.append(salename)
        if department != "":
            list_i.append("department")
            list_j.append(department)
        if dutyname != "":
            list_i.append("dutyname")
            list_j.append(dutyname)
        if membername != "":
            list_i.append("membername")
            list_j.append(membername)
        dict_search = dict(zip(list_i,list_j))#转化为字典
        try:
            if request.session.get('is_login', None):
                if starttime != "" and endtime != "":
                    projects = Project.objects.filter(Q(workdate__gte = starttime)&Q(workdate__lte = endtime)&Q(flag__in = flags)).filter(**dict_search).all().order_by('-workdate').skip((current_page-1)*17).limit(17)
                if starttime != "" and endtime == "":
                    projects = Project.objects.filter(Q(workdate = starttime)&Q(flag__in = flags)).filter(**dict_search).all().order_by('-workdate').skip((current_page-1)*17).limit(17)
                if starttime == "" and endtime != "":
                    projects = Project.objects.filter(Q(workdate = endtime)&Q(flag__in = flags)).filter(**dict_search).all().order_by('-workdate').skip((current_page-1)*17).limit(17)
                if starttime == "" and endtime == "":
                    projects = Project.objects.filter(Q(flag__in = flags)).filter(**dict_search).all().order_by('-workdate').skip((current_page-1)*17).limit(17)
                if projects:
                    datas = []
                    for project in projects:
                        datas.append({
                            'id': str(project.id),
                            'contractno': project.contractno,
                            'projectname': project.projectname,
                            'clientname': project.clientname,
                            'dutyname': project.dutyname,
                            'salename': project.salename,
                            'department': project.department,
                            'workdate': project.workdate,
                            'endtime':project.endtime,
                            'province': project.province,
                            'city': project.city,
                            'county': project.county,
                            'workload': project.workload,
                            'othercost': eval(project.othercost),
                            'fixedcost': project.fixedcost,
                            'worktype': project.worktype,
                            'workitem': project.workitem,
                            'workcontent': project.workcontent,
                            'toresult': project.toresult,
                            'membername': project.membername,
                            'memberid': project.memberid,
                            'request': project.request,
                            'level':project.level,
                            'flag': project.flag
                        })
                    serialNummber = (current_page -1)*17+1 
                    return JsonResponse({'result': 1, 'data': datas,'serialNummber':serialNummber})
                else:
                    return JsonResponse({'result': 0, 'data': []})
            else:
                return render(request, 'login.html')
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
    
#修改work_content项目
@csrf_exempt
def update_work_content(request):
    try:
        data = json.loads(request.POST['data'])
        # print(type(data['othercost']))
        try:
            project = Project.objects.get(id=data['id'])
            if project:
                project.contractno = data['contractno']
                project.projectname = data['projectname']
                project.clientname = data['clientname']
                project.dutyname = data['dutyname']
                project.salename = data['salename']
                project.workdate = data['workdate']
                project.endtime = data['endtime']
                project.province = data['province']
                project.city = data['city']
                project.county = data['county']
                project.workload = str(data['workload'])
                project.othercost = str(data['othercost'])
                project.fixedcost = data['fixedcost']
                project.worktype = data['worktype']
                project.workitem = data['workitem']
                project.workcontent = data['workcontent']
                project.toresult = data['toresult']
                project.membername = data['membername']
                project.memberid = data['memberid']
                project.request = data['request']
                project.flag = data['flag']
                project.returnreasons=''
                project.save()

                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#删除work_content项目
@csrf_exempt
def del_work_content(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            project = Project.objects.get(id=data['id'])
            if project:
                project.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})

#批量删除work_content项目
@csrf_exempt
def del_work_content_more(request):
    count_success = 0
    count_failure = 0
    try:
        data = json.loads(request.POST['data'])
        data = data['id']
        for i in range(len(data)):
            try:
                project = Project.objects.get(id=data[i])
                if project:
                    project.delete()
                    count_success=count_success+1
                else:
                    count_failure=count_default+1
            except Exception as e:
                print (e)
                return JsonResponse({'result': 0, 'data': ''})
        return JsonResponse({'result': 1, 'data': '删除成功','count_success':count_success,'count_failure':count_failure})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})

#数据库筛选查询信息
@csrf_exempt
def select_option(request):
    global get_projects
    try:
        dict_json = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
        # print dict_json
        starttime = dict_json["starttime"]
        endtime = dict_json["endtime"]
        province = dict_json["province"]
        city = dict_json["city"]
        # county = dict_json["county"]
        contractno = dict_json["contractno"]
        projectname = dict_json["projectname"]
        clientname = dict_json["clientname"]
        worktype = dict_json["worktype"]
        workitem = dict_json["workitem"]
        salename = dict_json["salename"]
        department = dict_json["department"]
        dutyname = dict_json["dutyname"]
        membername = dict_json["membername"]
        list_i = []
        list_j = []
        if province != "":
            list_i.append("province")
            list_j.append(province)
        if city != "":
            list_i.append("city")
            list_j.append(city)
        if contractno != "":
            list_i.append("contractno")
            list_j.append(contractno)
        if projectname != "":
            list_i.append("projectname")
            list_j.append(projectname)
        if clientname != "":
            list_i.append("clientname")
            list_j.append(clientname)
        if worktype != "":
            list_i.append("worktype")
            list_j.append(worktype)
        if workitem != "":
            list_i.append("workitem")
            list_j.append(workitem)
        if salename != "":
            list_i.append("salename")
            list_j.append(salename)
        if department != "":
            list_i.append("department")
            list_j.append(department)
        if dutyname != "":
            list_i.append("dutyname")
            list_j.append(dutyname)
        if membername != "":
            list_i.append("membername")
            list_j.append(membername)
        dict_search = dict(zip(list_i,list_j))#转化为字典
        # dict_a = {}
        # for key, value in dict_json.items():
            # if value != '':
                # dict_a[key] = value
        # list_a = []
        # list_b = []
        # for key1, value1 in dict_a.items():
            # list_a.append(key1)
            # list_b.append(value1)
        
        # q1 = Q()
        # q1.connector = 'AND'
        # for a in range(len(list_i)):
            # q1.children.append((list_i[a], list_j[a]))
        try:
            if request.session.get('is_login', None):
                if starttime != "" and endtime != "":
                    projects = Project.objects.filter(Q(workdate__gte = starttime)&Q(workdate__lte = endtime)&(Q(flag = "0")|Q(flag = "1"))).filter(**dict_search).all().order_by('-workdate')
                if starttime != "" and endtime == "":
                    projects = Project.objects.filter(Q(workdate = starttime)&(Q(flag = "0")|Q(flag = "1"))).filter(**dict_search).all().order_by('-workdate')
                if starttime == "" and endtime != "":
                    projects = Project.objects.filter(Q(workdate = endtime)&(Q(flag = "0")|Q(flag = "1"))).filter(**dict_search).all().order_by('-workdate')
                if starttime == "" and endtime == "":
                    projects = Project.objects.filter(Q(flag = "0")|Q(flag = "1")).filter(**dict_search).all().order_by('-workdate')
                    # projects = Project.objects.filter(Q(workdate__gte = time_c)&(Q(flag = "0")|Q(flag = "1"))).filter(**dict_search).all().order_by('-workdate')
                # projects = Project.objects.filter(**dict_search).all()
                if dict_json["user"] == "admin":
                    get_projects = projects
                if projects:
                    datas = []
                    for project in projects:
                        datas.append({
                            'id': str(project.id),
                            'contractno': project.contractno,
                            'projectname': project.projectname,
                            'clientname': project.clientname,
                            'dutyname': project.dutyname,
                            'salename': project.salename,
                            'department': project.department,
                            'workdate': project.workdate,
                            'endtime':project.endtime,
                            'province': project.province,
                            'city': project.city,
                            'county': project.county,
                            'workload': project.workload,
                            'level': project.level,
                            'othercost': eval(project.othercost),
                            'fixedcost': project.fixedcost,
                            'worktype': project.worktype,
                            'workitem': project.workitem,
                            'workcontent': project.workcontent,
                            'toresult': project.toresult,
                            'membername': project.membername,
                            'memberid': project.memberid,
                            'request': project.request
                        })

                    return JsonResponse({'result': 1, 'data': datas})
                else:
                    data_result = []
                    return JsonResponse({'result': 1, 'data': data_result})

            else:
                return render(request, 'login.html')


        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})

    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#上传文件数据到数据库（未使用）
@csrf_exempt
def upload_info(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            files = request.FILES.get('file')
            for file in files:
                if not file:
                    return HttpResponse('文件读取失败')
                # if platform.system() == "Windows":
                #     info_path = sys.path[0] + '/static/uploads/info'
                #
                # else:
                #     info_path = sys.path[1] + '/static/uploads/info'
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/info'

                for file_name in files_name:
                    write_file = open(info_path + '/' + file_name.name, 'wb')
                    for chunk in file_name.chunks():
                        write_file.write(chunk)
                    write_file.close()

            for file_name in files_name:
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/info'
                in_db = xlrd.open_workbook(info_path + '/' + file_name.name)
                # 获取sheet总行数
                rows = in_db.sheets()[0].nrows
                for val in range(rows - 11):
                    result = in_db.sheets()[0].row_values(val + 3)
                    user = User.objects.filter(real_name=result[13]).first()
                    # level = user.level
                    project = Project.objects.filter(membername=result[13]).first()
                    for num in range(16,23):
                        if result[num] != 0:
                            workload = float(result[num])
                            level = float((in_db.sheets()[0].cell(2, num).value).split(' ')[1])
                    user_level = float(level.split(' ')[1])
                    # # （0.5 * 0.7） / 21.75 * 12000
                    before_fixedcost = (user_level * workload) / 21.75 * 12000
                    after_fixedcost = str(float('%.2f' % before_fixedcost))

                    # contractno = '0' + str((result[4])).split('.')[0]

                    # # 转换时间
                    data_tuple = xlrd.xldate_as_tuple(result[1], 0)
                    data = str(data_tuple[0]) + '-' + str(data_tuple[1]) + '-' + str(data_tuple[2])
                    
                    data_tuple1 = xlrd.xldate_as_tuple(result[2], 0)
                    data1 = str(data_tuple1[0]) + '-' + str(data_tuple1[1]) + '-' + str(data_tuple1[2])

                    other_cost = [{u'costname': '市内交通', u'fee': result[23]},
                                  {u'costname': '差旅交通', u'fee': result[24]},
                                  {u'costname': '出差补助', u'fee': result[25]},
                                  {u'costname': '住宿费', u'fee': result[26]},
                                  {u'costname': '其他', u'fee': result[27]}]
                    cost1 = str(other_cost)
                    project = Project(
                        workdate=data,
                        endtime=data1,
                        province='',
                        city=result[4],
                        county='',
                        contractno=result[5],
                        projectname=result[6],
                        clientname=result[7],
                        salename=result[9],
                        department=result[8],
                        workcontent=result[10],
                        toresult=result[11],
                        request=result[12],
                        membername=result[13],
                        workload=str(result[15]),
                        fixedcost=after_fixedcost,
                        othercost=cost1,
                        remark=result[28],
                        level = level,
                        memberid=project.memberid
                    )
                    project.save()
            return JsonResponse({'result': 1, 'data': "OK"})
    else:
        return render(request, 'login.html')

@csrf_exempt
#把数据库项目信息写进表格
def get_info(request):
    global get_projects
    if request.session.get('is_login', None):
        wbk = xlwt.Workbook()  # 新建excel文件
        sheet = wbk.add_sheet('sheet 1', cell_overwrite_ok=True)  # 新建一个sheet
        # indexing is zero based, row then column
        style = xlwt.XFStyle()  # 初始化样式   加入了xlwt.
        font = xlwt.Font()  # 为样式创建字体
        font.name = '微软雅黑'
        font.bold = True
        style.font = font
        alignment = xlwt.Alignment()
        alignment.wrap = xlwt.Alignment.WRAP_AT_RIGHT #换行
        alignment.horz = xlwt.Alignment.HORZ_CENTER  # 水平居中
        alignment.vert = xlwt.Alignment.VERT_CENTER  # 垂直居中
        style.alignment = alignment
        
        tall_style1 = xlwt.easyxf('font:height 400')
        tall_style2 = xlwt.easyxf('font:height 760')

        sheet.write_merge(0, 1, 0, 0, '月份', style)
        sheet.write_merge(0, 1, 1, 1, '开始日期', style)
        sheet.write_merge(0, 1, 2, 2, '结束日期', style)
        sheet.write_merge(0, 1, 3, 3, '天数', style)
        sheet.write_merge(0, 1, 4, 4, '地点', style)
        sheet.write_merge(0, 1, 5, 5, '合同编号', style)
        sheet.write_merge(0, 1, 6, 6, '项目名称', style)
        sheet.write_merge(0, 1, 7, 7, '客户名称', style)
        sheet.write_merge(0, 1, 8, 8, '所属部门', style)
        sheet.write_merge(0, 1, 9, 9, '项目负责人', style)
        sheet.write_merge(0, 1, 10, 10, '销售负责人', style)
        sheet.write_merge(0, 1, 11, 11, '工作类', style)
        sheet.write_merge(0, 1, 12, 12, '工作项', style)
        sheet.write_merge(0, 1, 13, 13, '工作内容', style)
        sheet.write_merge(0, 1, 14, 14, '输出成果', style)
        sheet.write_merge(0, 1, 15, 15, '人员姓名', style)
        sheet.write_merge(0, 1, 16, 16, '工程量', style)
        sheet.write_merge(0, 1, 17, 17, '人员系数', style)
        sheet.write_merge(0, 1, 18, 18, '变动费用', style)
        sheet.write_merge(0, 1, 19, 19, '固定费用', style)
        sheet.col(0).width = (256*14)#月份
        sheet.col(1).width = (256*14)#开始日期
        sheet.col(2).width = (256*14)#结束日期
        sheet.col(3).width = (256*14)#天数
        sheet.col(4).width = (256*10)#地点
        sheet.col(5).width = (256*23)#合同编号
        sheet.col(6).width = (256*27)#项目名称
        sheet.col(7).width = (256*17)#客户名称
        sheet.col(8).width = (256*17)#所属部门
        sheet.col(9).width = (256*17)#项目负责人
        sheet.col(10).width = (256*17)#销售负责人
        sheet.col(11).width = (256*17)#工作类
        sheet.col(12).width = (256*20)#工作项
        sheet.col(13).width = (256*30)#工作内容
        sheet.col(14).width = (256*35)#输出成功
        sheet.col(15).width = (256*17)#人员姓名
        sheet.col(16).width = (256*9)#工程量
        sheet.col(17).width = (256*9)#人员系数
        sheet.col(18).width = (256*11)#变动费用
        sheet.col(19).width = (256*11)#固定费用
        sheet.row(0).set_style(tall_style1)
        sheet.row(1).set_style(tall_style1)
        for i in range(len(get_projects)):
            sheet.row(i+2).set_style(tall_style2)
        # for ok in range(16):
            # if ok != 5:
                # sheet.col(ok).width = (50 * 100) #设置列宽度
            # else:
                # sheet.col(ok).width = (50 * 250)
        try:
            # projects = Project.objects.all().order_by('-workdate')
            # print project
            # print type(project)
            datas = []
            
            for project in get_projects:
                a = []
                str_data = str(project.workdate)
                str_data =  str_data[0:4] + "年" + str_data[5:7] + "月"
                a.append(str_data)
                a.append(project.workdate.strftime("%Y/%m/%d"))
                a.append(project.workdate.strftime("%Y/%m/%d"))
                a.append(1)
                a.append(project.province + project.city)
                # a.append(project.city)
                # a.append(project.county)
                a.append(project.contractno)
                a.append(project.projectname)
                a.append(project.clientname)
                a.append(project.department)
                a.append(project.dutyname)
                a.append(project.salename)
                a.append(project.worktype)
                a.append(project.workitem)
                a.append(project.workcontent)
                a.append(project.toresult)
                a.append(project.membername)
                a.append(float(project.workload))
                a.append(project.level)
                othercost = eval(project.othercost)
                # print(type(eval(project.othercost)[0]))
                count = 0
                for i in range(5):
                    for key, val in othercost[i].items():
                        if key == 'fee':
                            count = count+float(val);
                            # a.append(float(val))           
                a.append(count)
                a.append(float(project.fixedcost))
                datas.append(a)
                # try:
                    # user = User.objects.filter(username=project.membername).first()
                # except Exception as e:
                    # return JsonResponse({'result': 0,'da':'aa'})
                # a.append(user.level)
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0,'da':'cccc'})

        for i in range(len(datas)):
            for b in range(20):
                sheet.write(i + 2, b, datas[i][b], style)
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        info_path = cc + '/static/get_info/info/'
        # if platform.system() == "Windows":
        #     info_path = sys.path[0] + '/static/get_info/info/'
        #
        # else:
        #     info_path = sys.path[1] + '/static/get_info/info/'

        # #project_info = info_path + '项目信息.xls'
        wbk.save(info_path + '项目信息.xls')

        return JsonResponse({'result': 1, 'data': '/static/get_info/info/项目信息.xls'})
    else:
        return render(request, 'login.html')

#admin查询新周报记录
@csrf_exempt
def select_option_flag(request):
    try:
        if request.session.get('is_login', None):
            projects = Project.objects.filter(flag = "1").all().order_by('-workdate')
            if projects:
                datas = []
                for project in projects:
                    datas.append({
                        'id': str(project.id),
                        'contractno': project.contractno,
                        'projectname': project.projectname,
                        'clientname': project.clientname,
                        'dutyname': project.dutyname,
                        'salename': project.salename,
                        'department': project.department,
                        'workdate': project.workdate,
                        'endtime': project.endtime,
                        'province': project.province,
                        'city': project.city,
                        'workload': project.workload,
                        'level': project.level,
                        'othercost': eval(project.othercost),
                        'fixedcost': project.fixedcost,
                        'worktype': project.worktype,
                        'workitem': project.workitem,
                        'workcontent': project.workcontent,
                        'toresult': project.toresult,
                        'membername': project.membername,
                        'memberid': project.memberid,
                        'request': project.request
                    })

                return JsonResponse({'result': 1, 'data': datas})
            else:
                data_result = []
                return JsonResponse({'result': 1, 'data': data_result})

        else:
            return render(request, 'login.html')
            
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#用户消息
@csrf_exempt
def select_option_flag_person(request):
    dict_json = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
    try:
        if request.session.get('is_login', None):
            datas = []
            if dict_json["dutyname"]=='符俊环':
                user_info = User.objects.filter(Q(status = '在职')).all()
                projects_un = Project.objects.filter(Q(flag = "2")).all()
                user_list = []
                for user in user_info:
                    user_list.append(user.real_name)
                for project_un in projects_un:
                    if project_un.dutyname in user_list:
                        continue;
                    else:
                        datas.append({
                            'id': str(project_un.id),
                            'contractno': project_un.contractno,
                            'projectname': project_un.projectname,
                            'clientname': project_un.clientname,
                            'dutyname': project_un.dutyname,
                            'salename': project_un.salename,
                            'department': project_un.department,
                            'workdate': project_un.workdate,
                            'endtime': project_un.endtime,
                            'province': project_un.province,
                            'city': project_un.city,
                            'workload': project_un.workload,
                            'level': project_un.level,
                            'othercost': eval(project_un.othercost),
                            'fixedcost': project_un.fixedcost,
                            'worktype': project_un.worktype,
                            'workitem': project_un.workitem,
                            'workcontent': project_un.workcontent,
                            'toresult': project_un.toresult,
                            'membername': project_un.membername,
                            'memberid': project_un.memberid,
                            'request': project_un.request,
                            'flag': project_un.flag,
                            'returnreasons': project_un.returnreasons
                        })
            projects = Project.objects.filter((Q(dutyname = dict_json["dutyname"])&Q(flag = "2"))|(Q(membername=dict_json["dutyname"])&Q(flag = "3"))).all().order_by('-workdate')
            if projects:
                for project in projects:
                    datas.append({
                        'id': str(project.id),
                        'contractno': project.contractno,
                        'projectname': project.projectname,
                        'clientname': project.clientname,
                        'dutyname': project.dutyname,
                        'salename': project.salename,
                        'department': project.department,
                        'workdate': project.workdate,
                        'endtime': project.endtime,
                        'province': project.province,
                        'city': project.city,
                        'workload': project.workload,
                        'level': project.level,
                        'othercost': eval(project.othercost),
                        'fixedcost': project.fixedcost,
                        'worktype': project.worktype,
                        'workitem': project.workitem,
                        'workcontent': project.workcontent,
                        'toresult': project.toresult,
                        'membername': project.membername,
                        'memberid': project.memberid,
                        'request': project.request,
                        'flag': project.flag,
                        'returnreasons': project.returnreasons
                    })

                # return JsonResponse({'result': 1, 'data': datas})
            # else:
                # data_result = []
                # return JsonResponse({'result': 1, 'data': data_result})

            return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')
            
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#修改flag为0
@csrf_exempt
def change_flag(request):
    try:
        data = json.loads(request.POST['data_id'])
        try:
            count = 0
            for i in data['id']:
                project = Project.objects.get(id = i)
                if project:
                    project.flag = "0"
                    project.save()
                    count += 1
                else:
                    continue
            return JsonResponse({'result': 1, 'data': '将'+str(count)+'条数据修改flag为0成功'})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '修改flag为0失败'})

#修改flag为1
@csrf_exempt
def change_flag_1(request):
    try:
        data = json.loads(request.POST['data_id'])
        try:
            project = Project.objects.get(id=data['id'])
            if project:
                project.flag = "1"
                project.save()
                return JsonResponse({'result': 1, 'data': '修改flag为1成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '修改flag为1失败'})

#修改flag为3
@csrf_exempt
def change_flag_3(request):
    try:
        data = json.loads(request.POST['data_id'])
        try:
            project = Project.objects.get(id=data['id'])
            if project:
                project.flag = "3"
                project.returnreasons = data['reasonscontent']
                project.save()
                return JsonResponse({'result': 1, 'data': '修改flag为3成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '修改flag为3失败'})
#导入项目
@csrf_exempt
def upload_project(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            # print files_name
            files = request.FILES.get('file')
            for file in files:
                if not file:
                    return HttpResponse('文件读取失败')
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/info'

                for file_name in files_name:
                    write_file = open(info_path + '/' + file_name.name, 'wb')
                    for chunk in file_name.chunks():
                        write_file.write(chunk)
                    write_file.close()

            for file_name in files_name:
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/info'
                in_db = xlrd.open_workbook(info_path + '/' + file_name.name)
                # 获取sheet总行数
                rows = in_db.sheets()[0].nrows
                clientnames = []
                count1 = 0
                count2 = 0
                for val in range(rows-2):
                    result = in_db.sheets()[0].row_values(val+2)
                    if result[0] != '':
                        work_info = work.objects.filter(contractno=(str(result[2]).replace(' ',''))).first()
                        if work_info and work_info.contractno != '':
                            count2=count2+1#重复数据条数
                        else:
                            clientnames.append(result[1].replace(' ',''))
                            work_info = work(
                                xuhao = result[0],
                                clientname = result[1].replace(' ',''),
                                contractno = str(result[2]).replace(' ',''),
                                type = result[3].replace(' ',''),
                                projectname = result[4].replace(' ',''),
                                money = str(result[5]).replace(' ',''),
                                state = result[6].replace(' ',''),
                                caigouzhuangtai = result[7].replace(' ',''),
                                arrival_status = '未到货',
                                # shishiqingkuang = '未实施',
                                guidangqingkuang =str(result[8]).replace(' ',''),
                                huowuqingdian = result[9].replace(' ',''),
                                chuyanbaogao = result[10].replace(' ',''),
                                zhongyanbaogao = result[11].replace(' ',''),
                                dutyname = result[12].replace(' ',''),
                                salename =result[13].replace(' ',''),
                                hetongqixian =result[14].replace(' ',''),
                                yikaipiao =str(result[15]).replace(' ',''),
                                yishoukuan =str(result[16]).replace(' ',''),
                                remark =result[17].replace(' ',''),
                                department = '集成实施部',
                                latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                            )
                            work_info.save()
                            count1=count1+1#添加成功条数
                clientnames = list(set(clientnames))
                for clientname in clientnames:
                    duty = Duty.objects.filter(dutyname = clientname).first()
                    if duty:
                        continue
                    else:
                        duty = Duty(
                            dutyname=clientname
                        )
                    duty.save()
            return JsonResponse({'result': 1, 'data': "OK",'count1':count1,'count2':count2})
    else:
        return render(request, 'login.html')

#把数据库的所有项目进度信息写进表格
@csrf_exempt
def get_workinfo(request):
    if request.session.get('is_login', None):
        works_info = work.objects.all().order_by('xuhao')
        if works_info:
            wbk = xlwt.Workbook()  # 新建excel文件
            sheet = wbk.add_sheet('sheet 1', cell_overwrite_ok=True)  #  新建一个sheet
            # indexing is zero based, row then column
            style = xlwt.XFStyle()  # 初始化样式   加入了xlwt.
            font = xlwt.Font()  # 为样式创建字体
            font.name = '微软雅黑'
            font.bold = True
            style.font = font
            alignment = xlwt.Alignment()
            alignment.wrap = xlwt.Alignment.WRAP_AT_RIGHT #换行
            alignment.horz = xlwt.Alignment.HORZ_CENTER  # 水平居中
            alignment.vert = xlwt.Alignment.VERT_CENTER  # 垂直居中
            style.alignment = alignment
            
            style1 = xlwt.XFStyle()  # 初始化样式   加入了xlwt.
            font1 = xlwt.Font()  # 为样式创建字体
            font1.name = '微软雅黑'
            font1.bold = True
            style1.font = font
            alignment1 = xlwt.Alignment()
            alignment1.wrap = xlwt.Alignment.WRAP_AT_RIGHT #换行
            alignment1.horz = xlwt.Alignment.HORZ_LEFT # 靠左对齐
            alignment1.vert = xlwt.Alignment.VERT_CENTER  # 垂直居中
            style1.alignment = alignment1
            
            tall_style1 = xlwt.easyxf('font:height 400')
            # tall_style2 = xlwt.easyxf('font:height 760')
            sheet.write(0, 0, '序号', style)
            sheet.write(0, 1, '客户名称', style)
            sheet.write(0, 2, '合同编号', style)
            sheet.write(0, 3, '类型', style)
            sheet.write(0, 4, '项目名称', style)
            sheet.write(0, 5, '合同金额', style)
            sheet.write(0, 6, '项目状态', style)
            sheet.write(0, 7, '采购状态', style)
            # sheet.write(0, 8, '实施情况', style)
            sheet.write(0, 8, '归档情况', style)
            sheet.write(0,9, '货物清点', style)
            sheet.write(0,10, '初验报告', style)
            sheet.write(0,11, '终验报告', style)
            sheet.write(0,12, '项目负责人', style)
            sheet.write(0,13, '销售负责人', style)
            sheet.write(0,14, '服务合同期限', style)
            sheet.write(0,15, '已开票%', style)
            sheet.write(0,16, '已收款%', style)
            sheet.write(0,17, '备注（下笔收款的条件和%百分比，预计时间点）（或其它需要说明的事项）', style)
            sheet.write(0,18, '最近更新时间', style)
            sheet.write(0,19, '最近更新内容', style)
            sheet.col(0).width = (256*9)#序号
            sheet.col(1).width = (256*28)#客户名称
            sheet.col(2).width = (256*36)#合同编号
            sheet.col(3).width = (256*20)#类型
            sheet.col(4).width = (256*80)#项目名称
            sheet.col(5).width = (256*24)#合同金额
            sheet.col(6).width = (256*16)#项目状态
            sheet.col(7).width = (256*16)#采购状态
            # sheet.col(8).width = (256*16)#实施情况
            sheet.col(8).width = (256*16)#归档情况
            sheet.col(9).width = (256*16)#货物清点
            sheet.col(10).width = (256*16)#初验报告
            sheet.col(11).width = (256*16)#终验报告
            sheet.col(12).width = (256*17)#项目负责人
            sheet.col(13).width = (256*17)#销售负责人
            sheet.col(14).width = (256*30)#服务合同期限
            sheet.col(15).width = (256*19)#已开票
            sheet.col(16).width = (256*19)#已收款
            sheet.col(17).width = (256*90)#备注
            sheet.col(18).width = (256*30)#最近更新时间
            sheet.col(19).width = (256*80)#最近更新内容
            # sheet.row(0).set_style(tall_style1)
            for i in range(len(works_info)):
                sheet.row(i).set_style(tall_style1)
            try:
                datas = []
                for work_info in works_info:
                    a = []
                    # str_data = str(work_info.lastupdate)
                    # str_data =  str_data[0:4] + "年" + str_data[5:7] + "月"
                    a.append(str(work_info.xuhao))
                    a.append(work_info.clientname)
                    a.append(work_info.contractno)
                    a.append(work_info.type)
                    a.append(work_info.projectname)
                    a.append(work_info.money)
                    a.append(work_info.state)
                    a.append(work_info.caigouzhuangtai)
                    # if work_info.shishiqingkuang:
                        # a.append(work_info.shishiqingkuang)
                    # else:
                        # a.append('')
                    if work_info.guidangqingkuang!='':
                        a.append(str(float(work_info.guidangqingkuang)*100)+'%')
                    else:
                        a.append('')
                    a.append(work_info.huowuqingdian)
                    a.append(work_info.chuyanbaogao)
                    a.append(work_info.zhongyanbaogao)
                    a.append(work_info.dutyname)
                    a.append(work_info.salename)
                    a.append(work_info.hetongqixian)
                    if work_info.yikaipiao!='':
                        a.append(str(float(work_info.yikaipiao)*100)+'%')
                    else:
                        a.append('')
                    if work_info.yishoukuan!='':
                        a.append(str(float(work_info.yishoukuan)*100)+'%')
                    else:
                        a.append('')
                    a.append(work_info.remark)
                    a.append(str(work_info.latestupdate))
                    if work_info.latestupdatecontent:
                        a.append(work_info.latestupdatecontent)
                    else:
                         a.append('')
                    datas.append(a)
            except Exception as e:
                print(e)
                return JsonResponse({'result': 0,'da':'cccc'})
            # print datas
            for i in range(len(datas)):
                for b in range(20):
                    if b in [4,18,19]:
                        sheet.write(i + 1, b, datas[i][b], style1)
                    else :
                        sheet.write(i + 1, b, datas[i][b], style)
            cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            info_path = cc + '/static/get_info/info/'
            filename = "合同一览表" + str(time.strftime('%Y%m%d',time.localtime(time.time()))) + ".xls"
            wbk.save(info_path + filename)
            return JsonResponse({'result': 1, 'data': '/static/get_info/info/'+filename})
        else:
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

#添加客户
@csrf_exempt
def add_project_duty(request):
    try:
        data = json.loads(request.POST['data'])
        # print data['clientname']
        duty = Duty(
            dutyname=data['clientname'].replace(' ',''),
        )
        duty.save()
        return JsonResponse({'result': 1, 'data': '添加成功'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#显示客户名称
@csrf_exempt
def display_duty(request):
    from xpinyin import Pinyin
    pin = Pinyin()
    dutys = Duty.objects.filter().all().order_by('dutyname')
    try:
        temp = []
        if dutys:
            datas = []
            for duty in dutys:
                dic = {}
                dic['id'] = str(duty.id)
                dic['clientname'] = duty.dutyname
                client_name_pinyin = pin.get_pinyin(duty.dutyname)
                temp.append({ client_name_pinyin: dic})
            temp = sorted(temp, key=lambda x: x)
            for data in temp:
                datas.append(data.values()[0])
                # datas.append({
                    # 'id': str(duty.id),
                    # 'clientname': duty.dutyname,
                # })

            return JsonResponse({'result': 1, 'data': datas})
        else:
            data_result = []
            return JsonResponse({'result': 1, 'data': data_result})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除客户
@csrf_exempt
def del_duty(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            duty=Duty.objects.get(id=data['id'])
            if duty:
                duty.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '删除失败'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#修改客户
@csrf_exempt
def update_client(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            duty = Duty.objects.get(id=data['id'])
            if duty:
                duty.dutyname = data['clientname']
                duty.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#添加销售负责人
@csrf_exempt
def add_saleman(request):
    try:
        data = json.loads(request.POST['data'])
        sale = Sale(
            salename=data['salename'].replace(' ',''),
            telnum=data['telnum'].replace(' ',''),
            emailaddr=data['emailaddr'].replace(' ',''),
        )
        sale.save()
        return JsonResponse({'result': 1, 'data': '添加成功'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#显示销售负责人
@csrf_exempt
def display_saleman(request):
    sales = Sale.objects.filter().all()
    try:
        if sales:
            datas = []
            for sale in sales:
                datas.append({
                    'id': str(sale.id),
                    'salename': sale.salename,
                    'telnum': sale.telnum,
                    'emailaddr': sale.emailaddr
                })

            return JsonResponse({'result': 1, 'data': datas})
        else:
            data_result = []
            return JsonResponse({'result': 1, 'data': data_result})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除销售负责人
@csrf_exempt
def del_saleman(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            sale=Sale.objects.get(id=data['id'])
            if sale:
                sale.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '删除失败'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#修改销售负责人
@csrf_exempt
def update_saleman(request):
    try:
        data = json.loads(request.POST['data'])
        # print(type(data['othercost']))
        try:
            sale = Sale.objects.get(id=data['id'])
            if sale:
                sale.salename = data['salename']
                sale.telnum = data['telnum']
                sale.emailaddr = data['emailaddr']
                sale.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#显示工作类型
@csrf_exempt
def display_worktype(request):
    types = Worktype.objects.filter().all().order_by('-worktype')
    try:
        if types:
            datas = []
            for type in types:
                datas.append({
                    'id': str(type.id),
                    'worktype': type.worktype,
                    'workitem': type.workitem
                })

            return JsonResponse({'result': 1, 'data': datas})
        else:
            data_result = []
            return JsonResponse({'result': 1, 'data': data_result})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#添加工作类型
@csrf_exempt
def add_worktype(request):
    try:
        data = json.loads(request.POST['data'])
        type = Worktype(
            worktype=data['worktype'].replace(' ',''),
            workitem=data['workitem'].replace(' ',''),
        )
        type.save()
        return JsonResponse({'result': 1, 'data': '添加成功'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除工作类型
@csrf_exempt
def del_worktype(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            type=Worktype.objects.get(id=data['id'])
            if type:
                type.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '删除失败'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#修改工作类型
@csrf_exempt
def update_worktype(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            type = Worktype.objects.get(id=data['id'])
            if type:
                type.worktype = data['worktype']
                type.workitem = data['workitem']
                type.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#按周显示提交日报记录
@csrf_exempt
def show_work_count(request):
    try:
        if request.session.get('is_login', None):
            checks_info = Check.objects.all().order_by('-checkdate')
            if checks_info:
                data = []
                for check_info in checks_info:
                    # if check_info.checkresult != '正常提交':
                    data.append({
                        'id': str(check_info.id),
                        'checkdate': check_info.checkdate,
                        'username': check_info.username,
                        'real_name': check_info.real_name,
                        'count': check_info.count,
                        'checkresult': check_info.checkresult
                    })
                    # else:
                        # continue
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '报表查询失败'})
#按月显示提交日报记录
@csrf_exempt
def show_work_count_month(request):
    try:
        if request.session.get('is_login', None):
            checks_info = Checkmonth.objects.all().order_by('-checkdate')
            if checks_info:
                data = []
                for check_info in checks_info:
                    # if check_info.checkresult != '正常提交':
                    data.append({
                        'id': str(check_info.id),
                        'checkdate': check_info.checkdate,
                        'username': check_info.username,
                        'real_name': check_info.real_name,
                        'count': check_info.count,
                        'checkresult': check_info.checkresult
                    })
                    # else:
                        # continue
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '报表查询失败'})
#得到服务器日期
@csrf_exempt
def get_server_date(request):
    return JsonResponse({'result':1,'data':time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))})
#对字典组成的列表进行排序reverse=True降序
def sort_prj_contentdata(request):
    try:
        data = json.loads(request.POST['data'])
        data = data['data']
        data = sorted(data, key=lambda x : (x['state'],x['latestupdate']), reverse=True)
        return JsonResponse({'result':1,'data':data})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
def sort_report_serial_number(request):
    try:
        data = json.loads(request.POST['data'])
        data = data['data']
        data = sorted(data, key=lambda x : x['serial_number'], reverse=True)
        return JsonResponse({'result':1,'data':data})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
def sort_clientname(request):
    from xpinyin import Pinyin
    pin = Pinyin()
    try:
        data = json.loads(request.POST['data'])
        datas = []
        temp = []
        for val in data:
            name_py = pin.get_pinyin(val)
            temp.append({ name_py: val})
        temp = sorted(temp, key=lambda x: x)
        for data in temp:
            datas.append(data.values()[0])
        return JsonResponse({'result': 1, 'data': datas})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#上传合同
@csrf_exempt
def upload_contract(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            cont_name = request.POST.get('name')
            files = request.FILES.get('file')#感觉没卵用，就看有没有文件
            for file in files: 
                if not file:
                    return JsonResponse({'result':0,'data':'文件读取失败'})
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/contract/' + cont_name
                if os.path.exists(info_path) == False: #判断一个目录是否存在
                    os.makedirs(info_path) #多层创建目录
                # print os.path.exists(info_path)
                for file_name in files_name:
                    write_file = open(info_path + '/' + file_name.name, 'wb')
                    for chunk in file_name.chunks():
                        write_file.write(chunk)
                    write_file.close()
                shutil.make_archive(info_path,'zip',info_path)
                shutil.rmtree(info_path)
                return JsonResponse({'result':1,'data':'文件上传成功'})
    return JsonResponse({'result':0,'data':''})
@csrf_exempt
def upload_contract1(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            work_id = request.POST.get('id')
            files = request.FILES.get('file')#感觉没卵用，就看有没有文件
            cont_name = work.objects.get(id = work_id).cont_name
            for file in files: 
                if not file:
                    return JsonResponse({'result':0,'data':'文件读取失败'})
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/contract/' + cont_name
                if os.path.exists(info_path) == False: #判断一个目录是否存在
                    os.makedirs(info_path) #多层创建目录
                # print os.path.exists(info_path)
                for file_name in files_name:
                    write_file = open(info_path + '/' + file_name.name, 'wb')
                    for chunk in file_name.chunks():
                        write_file.write(chunk)
                    write_file.close()
                # shutil.make_archive(info_path,'zip',info_path)
                #将新上传的文件添加到压缩包
                zip_name = cc+'/static/uploads/contract/'+cont_name+'.zip'
                zipf = zipfile.ZipFile(zip_name,'a')
                path = cc + '/static/uploads/contract/'+cont_name  # 合同所在目录
                pre_len = len(path)
                for parent, dirnames, filenames in os.walk(path):
                    for filename in filenames:
                        pathfile = os.path.join(parent, filename)
                        arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                        zipf.write(pathfile, arcname)
                zipf.close()
                shutil.rmtree(info_path)
                return JsonResponse({'result':1,'data':'文件上传成功'})
    return JsonResponse({'result':0,'data':''})
#修改合同上传状态为OK并保存合同名称
@csrf_exempt
def change_cont_status_OK(request):
    try:
        data = json.loads(request.POST['data1'])
        try:
            work_info = work.objects.get(id=data['id'])
            if work_info:
                work_info.cont_status = 'OK'
                work_info.cont_name = data['name']
                # if work_info.cont_name == ''or work_info.cont_name == None:
                    # work_info.cont_name = data['name']
                # else:
                    # work_info.cont_name = work_info.cont_name + ';'+data['name']
                work_info.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#修改合同上传状态为None并删除所有 合同和合同名称
@csrf_exempt
def change_cont_status_None(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            work_info = work.objects.get(id=data['id'])
            cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            if work_info:
                for name in [data['name']]:
                    path = cc + '/static/uploads/contract/'+ name +'.zip'  # 文件路径
                    if os.path.exists(path):  # 如果文件存在
                        # 删除文件，可使用以下两种方法。
                        # os.remove(path)  
                        os.unlink(path)
                        print('delete success:%s.zip'%name)
                    else:
                        print('no such file:%s.zip'%name)  # 文件不存在
                if os.path.exists(""+cc+"/static/uploads/contract/"+ data['name'] +".zip"):
                    print ""+cc+"/static/uploads/contract/"+ data['name'] +".zip"
                    print('delete defaule')  # 未删除成功
                    return JsonResponse({'result': 0, 'data': '删除失败'})
                else:
                    work_info.cont_status = 'None'
                    # if work_info.cont_name != ''or work_info.cont_name != None:
                        # work_info.cont_name = ''
                    # else:
                        # # work_info.cont_name = work_info.cont_name 
                    work_info.cont_name = ''
                    work_info.save()
                    return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})         
@csrf_exempt
#将项目下文件打包
def download_ht(request):
    try:
        data = json.loads(request.POST['data'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # zip_name = cc+'/static/get_info/contract/'+data['projectname']+'.zip'
        # zipf = zipfile.ZipFile(zip_name,'w')
        # path = cc + '/static/uploads/contract/'  # 合同所在目录
        # pre_len = len(path)
        # for parent, dirnames, filenames in os.walk(path):
            # for filename in filenames:
                # if filename in data['filenames']:
                    # pathfile = os.path.join(parent, filename)
                    # arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                    # zipf.write(pathfile, arcname)
        # zipf.close()
        zip_path = cc+"/static/uploads/contract/"+ data['filenames'] +".zip"
        zip_path1 = "/static/uploads/contract/"+ data['filenames'] +".zip"
        if os.path.exists(zip_path):
            return JsonResponse({'result': 1, 'data':zip_path1})
        else: 
            return JsonResponse({'result': 0, 'data':'没找到文件'})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': '异常'})
@csrf_exempt
#提交新归档记录
def addAchive(request):
    str_time = str(time.strftime('%M%S',time.localtime(time.time())))
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])
            archive_last = Archive.objects.all().order_by('-sequen_num').first()
            try:
                #写数据表到Archive表
                if archive_last:
                    archive_info = Archive(
                        sequen_num = archive_last.sequen_num+1,
                        docum_sign =  data['docum_sign'],
                        contractno = data['contractno'],
                        projectname = data['projectname'],
                        docum_type = data['docum_type'],
                        docum_item = data['docum_item'],
                        docum_intro = data['docum_intro'],
                        submit_name = data['submit_name'],
                        docum_regis = time.strftime('%Y%m%d',time.localtime(time.time())),
                        docum_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                        other_intro =  data['other_intro'],
                        regis_name = data['regis_name'],
                        docum_file_id = data['docum_file_id']+str_time,
                    )
                else:
                    archive_info = Archive(
                        sequen_num = 1,
                        docum_sign =  data['docum_sign'],
                        contractno = data['contractno'],
                        projectname = data['projectname'],
                        docum_type = data['docum_type'],
                        docum_item = data['docum_item'],
                        docum_intro = data['docum_intro'],
                        submit_name = data['submit_name'],
                        docum_regis = time.strftime('%Y%m%d',time.localtime(time.time())),
                        docum_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                        other_intro =  data['other_intro'],
                        regis_name = data['regis_name'],
                        docum_file_id = data['docum_file_id']+str_time,
                    )
                archive_info.save()
                #保存文件到archive_file目录
                name = str(data["docum_file_id"]+str_time)
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                zip_name = cc+'/static/uploads/archive_file/'+name+'.zip'#压缩包位置和名称
                # print zip_name
                zipf = zipfile.ZipFile(zip_name,'w')#打开压缩包
                achive_path = cc + '/static/uploads/archive_file_tmp' #上传的归档文件所在目录
                pre_len = len(achive_path)
                for parent, dirnames, filenames in os.walk(achive_path):
                    for filename in filenames:
                        if filename in data['filenames']:
                            pathfile = os.path.join(parent, filename)
                            arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                            zipf.write(pathfile, arcname)
                            # os.remove(achive_path+'/'+filename)#删除临时文件夹里面的文件
                zipf.close()
                # for parent, dirnames, filenames in os.walk(achive_path):
                    # os.remove(achive_path+'/'+filename)#删除临时文件夹里面的所有文件
                #修改work表中的相对应数据
                this_work_info = work.objects.filter(Q(contractno=data['contractno'])&Q(projectname = data['projectname'])).first()#更新的work表
                content_info = Updatecontent.objects.filter(contractno=this_work_info.contractno).first()#更新的Updatecontent表
                a = 0
                b = 0
                c = 0
                time2 = str(time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())))
                if this_work_info.huowuqingdian:
                    if this_work_info.huowuqingdian == '已归档':
                        a = 0.3
                if this_work_info.chuyanbaogao:
                    if this_work_info.chuyanbaogao in  ['已归档' ,'不需要']:
                        b = 0.3
                if this_work_info.zhongyanbaogao:
                    if this_work_info.zhongyanbaogao in  ['已归档' ,'不需要']:
                        c =0.4
                if data['docum_item'] == '到货验收报告':
                    this_work_info.huowuqingdian = '已归档'
                    a = 0.3
                    this_work_info.latestupdatecontent = "system：归档了到货验收报告-->更新了“货物清点”。"
                    
                if data['docum_item'] == '初验报告':
                    this_work_info.chuyanbaogao = '已归档'
                    b = 0.3
                    this_work_info.latestupdatecontent = "system：归档了到货验收报告-->更新了“货物清点”。"
                if data['docum_item'] == '终验报告':
                    this_work_info.zhongyanbaogao = '已归档'
                    c = 0.4
                    this_work_info.latestupdatecontent = "system：归档了终验报告-->更新了“终验报告”。"
                this_work_info.guidangqingkuang = str(a+b+c)+'0'
                this_work_info.latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                if content_info:
                    content_info.content = content_info.content+'；'+ time2 + '，'  + this_work_info.latestupdatecontent
                else:
                    content_info = Updatecontent(
                        contractno = this_work_info.contractno,
                        content = time2 + this_work_info.latestupdatecontent
                    )
                this_work_info.save()
                content_info.save()
                # print this_work_info
                return JsonResponse({'result': 1, 'data': '添加成功'})
            except Exception as e:
                print (e)
                return JsonResponse({'result': 0, 'data': '添加失败' })
        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#显示归档记录
@csrf_exempt
def display_archive(request):
    try:
        if request.session.get('is_login', None):
            archives_info = Archive.objects.all().order_by('-docum_regis_latest')
            if archives_info:
                data = []
                for archive_info in archives_info:
                    data.append({
                        'id': str(archive_info.id),
                        'sequen_num': str(archive_info.sequen_num),
                        'docum_sign': archive_info.docum_sign,
                        'contractno': archive_info.contractno,
                        'projectname': archive_info.projectname,
                        'docum_type': archive_info.docum_type,
                        'docum_item': archive_info.docum_item,
                        'submit_name': archive_info.submit_name,
                        'docum_intro': archive_info.docum_intro,
                        'docum_regis': archive_info.docum_regis,
                        'docum_regis_latest': archive_info.docum_regis_latest,
                        'other_intro': archive_info.other_intro,
                        'regis_name': archive_info.regis_name,
                        'docum_file_id': archive_info.docum_file_id
                    })
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '归档记录失败'})
#上传归档文件到临时目录
@csrf_exempt
def upload_achive_tmp(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            files = request.FILES.get('file')
            for file in files:
                if not file:
                    return JsonResponse({'result':0,'data':'文件读取失败'})
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/archive_file_tmp'  
                name = []
                for file_name in files_name:
                    write_file = open(info_path + '/' + file_name.name, 'wb')
                    for chunk in file_name.chunks():
                        write_file.write(chunk)
                    write_file.close()
                    name.append(file_name.name)
                return JsonResponse({'result':1,'data':'文件上传成功','name':name})
    else:
        return render(request, 'login.html')
#点击“取消”时删除临时文件
@csrf_exempt
def delete_tmp_achive(request):
    try:
        data = json.loads(request.POST['data'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        achive_path = cc + '/static/uploads/archive_file_tmp' #上传的归档文件所在目录
        for parent, dirnames, filenames in os.walk(achive_path):
            # print(parent,dirnames,filenames)
            for filename in filenames:
                if filename in data['filenames']:
                    os.remove(achive_path+'/'+filename)#删除临时文件夹里面的文件
        return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除上传的压缩包文件
@csrf_exempt        
def delete_tmp_achive_old(request):
    try:
        data = json.loads(request.POST['data'])
        archive = Archive.objects.get(id = data['id'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        achive_path = cc + '/static/uploads/archive_file' #压缩完文件所在目录
        achive_path1 = cc + '/static/uploads/archive_file_tmp' #暂存的临时目录
        for parent, dirnames, filenames in os.walk(achive_path):
            for filename in filenames:
                if filename == (archive.docum_file_id+'.zip'):
                    # os.remove(achive_path+'/'+filename)#删除该文件
                    shutil.move(achive_path+'/'+filename,achive_path1+'/'+filename)
                    print "YI DONG GAN SHEN ME?"
        return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除上传的压缩包文件
@csrf_exempt        
def add_tmp_achive_old(request):
    try:
        data = json.loads(request.POST['data'])
        archive = Archive.objects.get(id = data['id'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        achive_path = cc + '/static/uploads/archive_file' #压缩完文件所在目录
        achive_path1 = cc + '/static/uploads/archive_file_tmp' #暂存的临时目录
        for parent, dirnames, filenames in os.walk(achive_path1):
            for filename in filenames:
                if filename == (archive.docum_file_id+'.zip'):
                    # os.remove(achive_path+'/'+filename)#删除该文件
                    shutil.move(achive_path1+'/'+filename,achive_path+'/'+filename)  
        return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#删除临时目录里的所有文件
@csrf_exempt
def delete_tmp_all(request):
    try:
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        path = cc + '/static/uploads/archive_file_tmp' #上传的归档文件所在目录
        for parent, dirnames, filenames in os.walk(path):#parent当前文件夹名称，dirnames为当前路径下的文件夹名称,filenames文件夹下的所有文件名
            for filename in filenames:
                os.remove(path+'/'+filename)#删除临时文件夹里面的文件
        return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#根据id查找某个归档记录，并将该记录对应的压缩包文件解压到achive_file_tmp目录
@csrf_exempt
def select_archive_id(request):
    try:
        data = json.loads(request.POST['data'])
        archive = Archive.objects.get(id=data['id'])
        if archive:
            try:
                filename_in_zip = []
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                path_src = cc + '/static/uploads/archive_file' #压缩包所在的目录
                path_dst = cc + '/static/uploads/archive_file_tmp' #解压的目的目录
                for parent, dirnames, filenames in os.walk(path_src):
                    for filename in filenames:
                        if(filename == (archive.docum_file_id + '.zip')):
                            #解压对应压缩包
                            zip_path = path_src +'/'+ archive.docum_file_id + '.zip'
                            r = zipfile.is_zipfile(zip_path)
                            if r:
                                fz = zipfile.ZipFile(zip_path, 'r')
                                filename_in_zip = fz.namelist()
                                for file in fz.namelist():#解压
                                    fz.extract(file, path_dst)
                            else:
                                print('This is not zip')
                data = {
                    'id': str(archive.id),
                    'sequen_num': str(archive.sequen_num),
                    'docum_sign': archive.docum_sign,
                    'contractno': archive.contractno,
                    'projectname': archive.projectname,
                    'docum_type': archive.docum_type,
                    'docum_item': archive.docum_item,
                    'submit_name': archive.submit_name,
                    'docum_intro': archive.docum_intro,
                    'docum_regis': archive.docum_regis,
                    'docum_regis_latest': archive.docum_regis_latest,
                    'other_intro': archive.other_intro,
                    'regis_name': archive.regis_name,
                    'docum_file_id': archive.docum_file_id,
                    'filename_in_zip': filename_in_zip,
                }
            except Exception as e:
                print(e)
                return JsonResponse({'result': 0, 'data': ''})
            return JsonResponse({'result': 1, 'data': data})
        else:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#修改归档记录
@csrf_exempt
def changeAchive(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])
            archive = Archive.objects.get(id = data['id'])
            try:
                if archive:
                    archive.docum_sign = data['docum_sign']
                    # archive.contractno = data['contractno']
                    # archive.projectname = data['projectname']
                    # archive.docum_type = data['docum_type']
                    # archive.docum_item = data['docum_item']
                    archive.docum_intro = data['docum_intro']
                    # archive.submit_name = data['submit_name']
                    archive.docum_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                    archive.other_intro =  data['other_intro']
                    archive.regis_name = data['regis_name']
                    archive.save()
                    cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

                    #从压缩包剔除要删除的文件
                    zip_path = cc+'/static/uploads/archive_file/'#压缩包位置
                    achive_path = cc + '/static/uploads/archive_file_tmp/' #上传的归档文件所在位置
                    your_delet_file = data['achive_document_value1']#要删除的文件名称列表
                    # print your_delet_file
                    old_zipfile = archive.docum_file_id + '.zip' #原文件名
                    new_zipfile = archive.docum_file_id + '_new.zip' #删除完成的新文件名
                    old_path = zip_path + old_zipfile #原文件绝对路径
                    new_path = zip_path + new_zipfile #新文件绝对路径
                    zin = zipfile.ZipFile(old_path, 'r') #读取对象
                    zout = zipfile.ZipFile(new_path, 'w') #被写入对象
                    for item in zin.infolist():
                        buffer = zin.read(item.filename)
                        if (item.filename not in your_delet_file):  #剔除要删除的文件
                            zout.writestr(item, buffer) #把文件写入到新对象中
                    zout.close() 
                    zin.close() 
                    shutil.move(new_path,old_path)#用新文件覆盖旧文件
                    #把新上传的文件加入压缩包
                    zipf = zipfile.ZipFile(old_path,'a')#打开压缩包，可追加
                    # filename_in_zip = zipf.namelist()#返回压缩包内所有文件名
                    # print filename_in_zip
                    pre_len = len(achive_path)
                    for parent, dirnames, filenames in os.walk(achive_path):
                        for filename in filenames:
                            if filename in data['achive_document_value']:
                                # if filename in filename_in_zip:
                                    # print filename
                                    # print type(filename)
                                    # filename1 = os.path.splitext(filename)[0]+'1'+os.path.splitext(filename)[1]#文件重复，改名
                                    # print filename1
                                    # print type(filename1)
                                    # os.rename(filename,filename1)
                                    # pathfile = os.path.join(parent, filename1)
                                    # arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                                    # zipf.write(pathfile, arcname)
                                # else:
                                pathfile = os.path.join(parent, filename)
                                arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                                zipf.write(pathfile, arcname)
                    zipf.close()

                    # zip_name = cc+'/static/uploads/archive_file/'+archive.docum_file_id + '.zip'#压缩包位置和名称
                    # zipf = zipfile.ZipFile(zip_name,'w')#打开压缩包
                    # achive_path = cc + '/static/uploads/archive_file_tmp' #上传的归档文件所在目录
                    # pre_len = len(achive_path)
                    # for parent, dirnames, filenames in os.walk(achive_path):
                        # for filename in filenames:
                            # if filename in (data['achive_document_value']+','+''.join(data['filenames'])):#这里好像有问题，反正要注释掉就懒得改了
                                # if filename not in data['achive_document_value1']:
                                    # # print filename
                                    # pathfile = os.path.join(parent, filename)
                                    # arcname = pathfile[pre_len:].strip(os.path.sep)   #相对路径
                                    # zipf.write(pathfile, arcname)
                                # # os.remove(achive_path+'/'+filename)#删除临时文件夹里面的文件
                    # zipf.close()
                # # for parent, dirnames, filenames in os.walk(achive_path):
                    # # os.remove(achive_path+'/'+filename)#删除临时文件夹里面的所有文件

                return JsonResponse({'result': 1, 'data': '修改成功'})
            except Exception as e:
                print (e)
                return JsonResponse({'result': 0, 'data': '修改失败' })
        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})        
# 删除归档记录
@csrf_exempt
def delete_achive_jilu(request):
    try:
        data = json.loads(request.POST['data'])
        archive = Archive.objects.get(id = data['id'])
        if archive:
            cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            path = cc + '/static/uploads/archive_file' #压缩文件位置
            ThefileN =archive.docum_file_id + '.zip'#文件名称
            for parent, dirnames, filenames in os.walk(path):
                for filename in filenames:
                    if filename == ThefileN:
                        os.remove(path+'/'+ThefileN)#删除临时文件夹里面的文件
            archive.delete()
            #修改work表数据
            this_work_info = work.objects.filter(Q(contractno=archive.contractno)&Q(projectname = archive.projectname)).first()
            content_info = Updatecontent.objects.filter(contractno=this_work_info.contractno).first()#更新的Updatecontent表
            if this_work_info.guidangqingkuang not in ['0','0.0','0.00']:
                if archive.docum_item == '到货验收报告':
                    if this_work_info.huowuqingdian == '已归档':
                        this_work_info.huowuqingdian = '未满足'
                        this_work_info.guidangqingkuang = str(float(this_work_info.guidangqingkuang)-0.3)
                        this_work_info.latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                        this_work_info.latestupdatecontent = "system：删除了到货验收报告-->更新了“货物清点”。"
                        time2 = str(time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())))
                        if content_info:
                            content_info.content = content_info.content+'；'+ time2 + '，'  + this_work_info.latestupdatecontent
                        else:
                            content_info = Updatecontent(
                                contractno = this_work_info.contractno,
                                content = time2 + this_work_info.latestupdatecontent
                            )
                if archive.docum_item == '初验报告':
                    if this_work_info.chuyanbaogao in  ['已归档' ,'不需要']:
                        this_work_info.chuyanbaogao = '未满足'
                        this_work_info.guidangqingkuang = str(float(this_work_info.guidangqingkuang)-0.3)
                        this_work_info.latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                        this_work_info.latestupdatecontent = "system：删除了初验报告-->更新了“初验报告”。"
                        time2 = str(time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())))
                        if content_info:
                            content_info.content = content_info.content+'；'+ time2 + '，'  + this_work_info.latestupdatecontent
                        else:
                            content_info = Updatecontent(
                                contractno = this_work_info.contractno,
                                content = time2 + this_work_info.latestupdatecontent
                            )
                if archive.docum_item == '终验报告':
                    if this_work_info.zhongyanbaogao in ['已归档','不需要']:
                        this_work_info.zhongyanbaogao = '未满足'
                        this_work_info.guidangqingkuang = str(float(this_work_info.guidangqingkuang)-0.4)
                        this_work_info.latestupdatecontent = "system：删除终验报告-->更新了“终验报告”。"
                        time2 = str(time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())))
                        if content_info:
                            content_info.content = content_info.content+'；'+ time2 + '，'  + this_work_info.latestupdatecontent
                        else:
                            content_info = Updatecontent(
                                contractno = this_work_info.contractno,
                                content = time2 + this_work_info.latestupdatecontent
                            )
            this_work_info.save()
            content_info.save()
        else:
            return JsonResponse({'result': 0, 'data': '未找到记录'})
        return JsonResponse({'result': 1, 'data': ' '})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#筛选归档记录
@csrf_exempt
def select_archive(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
            starttime = data["starttime"]
            endtime = data["endtime"]
            # print starttime
            # print type(starttime)
            contractno = data["contractno"]
            projectname = data["projectname"]
            docum_type = data["documtype"]
            docum_item = data["documitem"]
            list_i = []
            list_j = []
            if contractno != "":
                list_i.append("contractno")
                list_j.append(contractno)
            if projectname != "":
                list_i.append("projectname")
                list_j.append(projectname)
            if docum_type != "":
                list_i.append("docum_type")
                list_j.append(docum_type)
            if docum_item != "":
                list_i.append("docum_item")
                list_j.append(docum_item)
            dict_search = dict(zip(list_i,list_j))#转化为字典
            if starttime != "" and endtime != "":
                archives_info = Archive.objects.filter(Q(docum_regis__gte = starttime)&Q(docum_regis__lte = endtime)).filter(**dict_search).all().order_by('-docum_regis_latest')
            if starttime != "" and endtime == "":
                archives_info = Archive.objects.filter(Q(docum_regis = starttime)).filter(**dict_search).all().order_by('-docum_regis_latest')
            if starttime == "" and endtime != "":
                archives_info = Archive.objects.filter(Q(docum_regis = endtime)).filter(**dict_search).all().order_by('-docum_regis_latest')
            if starttime == "" and endtime == "":
                archives_info = Archive.objects.filter(**dict_search).all().order_by('-docum_regis_latest')
            if archives_info:
                data = []
                for archive_info in archives_info:
                    data.append({
                        'id': str(archive_info.id),
                        'sequen_num': str(archive_info.sequen_num),
                        'docum_sign': archive_info.docum_sign,
                        'contractno': archive_info.contractno,
                        'projectname': archive_info.projectname,
                        'docum_type': archive_info.docum_type,
                        'docum_item': archive_info.docum_item,
                        'submit_name': archive_info.submit_name,
                        'docum_intro': archive_info.docum_intro,
                        'docum_regis': archive_info.docum_regis,
                        'docum_regis_latest': archive_info.docum_regis_latest,
                        'other_intro': archive_info.other_intro,
                        'regis_name': archive_info.regis_name,
                        'docum_file_id': archive_info.docum_file_id
                    })
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '归档记录失败'})
#检查某个项目是否存在某个归档项的记录
@csrf_exempt
def check_archive_item(request):
    try:
        # print request.POST.get('contractno')
        archive = Archive.objects.filter(Q(contractno=request.POST.get('contractno'))&Q(docum_item=request.POST.get('docum_item'))).all()
        if archive:
            return JsonResponse({'result': 0, 'data': ''})
        else:
            return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
#检查某个项目是否存在初验报告记录
@csrf_exempt
def check_archive_item_cy(request):
    try:
        # print request.POST.get('contractno')
        archive = Archive.objects.filter(Q(contractno=request.POST.get('contractno'))).all()
        if archive:
            for a in archive:
                if a.docum_item == "初验报告":
                    return JsonResponse({'result': 1, 'data': ''})
            return JsonResponse({'result': 0, 'data': ''})
        else:
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 2, 'data': ''})
#获得产品 品牌类型型号
@csrf_exempt
def get_equipment(request):
    try:
        products = Equip_prod.objects.all()
        if products:
            data = []
            for product in products:
                data.append({
                    'id': str(product.id),
                    'brand': product.brand,
                    'type': product.type,
                    'model': product.model,
                })
            return JsonResponse({'result': 1, 'data': data})
        else:
            datas = []
            return JsonResponse({'result': 0, 'data': datas})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '查询失败'})

#新增合同设备
@csrf_exempt
def add_equipment(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
            equip_info = Equip_regist(
                contractno = data['contractno'],
                projectname = data['projectname'],
                dutyname = data['dutyname'],
                regis_name = data['regis_name'],
                equip_regis = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                remake = data['remake'],
                count = len(data['equipment']),
            )
            equip_info.save()
            for equipment in data['equipment']:
                equipprod_info = Equip_regist_prod(
                    contractno = data['contractno'],
                    brand = equipment['brand'],
                    type = equipment['type'],
                    model = equipment['model'],
                    number = int(equipment['num'].encode("utf-8")),
                    serial = equipment['serial'],
                    rank = equipment['rank'],
                    remake = '',
                )
                equipprod_info.save()
            return JsonResponse({'result': 1, 'data': 'success'})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': 'fail'})
#修改合同设备
@csrf_exempt
def change_equipment(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
            equip = Equip_regist.objects.filter( contractno = data['contractno']).first()
            if equip:
                if len(data['equipment']) != 0:
                    for equipment in data['equipment']:
                        equipprod_info = Equip_regist_prod(
                            contractno = data['contractno'],
                            brand = equipment['brand'],
                            type = equipment['type'],
                            model = equipment['model'],
                            number = int(equipment['num'].encode("utf-8")),
                            serial = equipment['serial'],
                            rank = equip.count + int(equipment['rank']),
                            remake = '',
                        )
                        equipprod_info.save()
                if data['remake'] != '':
                    equip.remake = data['remake']
                equip.projectname = data['projectname']
                equip.dutyname = data['dutyname']
                equip.regis_name = data['regis_name']
                equip.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                equip.count = equip.count + len(data['equipment'])
                equip.save()
                return JsonResponse({'result': 1, 'data': 'success'})
            else:
                return JsonResponse({'result': 0, 'data': 'fail1'})
        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': 'err'})
#展示设备信息记录
@csrf_exempt
def display_equipment(request):
    try:
        equip_infos = Equip_regist.objects.all().order_by('-equip_regis_latest')
        if equip_infos:
            data = []
            for equip_info in equip_infos:
                data.append({
                    'id' : str(equip_info.id),
                    "contractno" : equip_info.contractno,
                    "projectname" : equip_info.projectname,
                    "dutyname" : equip_info.dutyname,
                    "regis_name" : equip_info.regis_name,
                    "remake" : equip_info.remake,
                    "equip_regis" : equip_info.equip_regis,
                    "equip_regis_latest" : equip_info.equip_regis_latest,
                    "count" : equip_info.count,
                })
            return JsonResponse({'result': 1, 'data': data})
        else:
            return JsonResponse({'result': 0, 'data':''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data':''})

#检查某个项目是否存在设备信息登记记录
@csrf_exempt
def check_equipment_item(request):
    try:
        data = json.loads(request.POST['data'])
        equip = Equip_regist.objects.filter( contractno = data['contractno']).all()
        if equip:
            return JsonResponse({'result': 2, 'data': ''})
        else:
            return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
        
#删除某个项目的设备信息登记记录
@csrf_exempt
def del_cont_equipment(request):
    try:
        data = json.loads(request.POST['data'])
        equip = Equip_regist.objects.filter(id = data['id']).first()
        if equip:
            equipprods = Equip_regist_prod.objects.filter(contractno = equip.contractno).all()
            if equipprods:
                for equipprod in equipprods:
                    equipprod.delete()
            equip.delete()
            return JsonResponse({'result': 1, 'data': '成功'})
        else:
            return JsonResponse({'result': 0, 'data': '失败'})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#检查某个项目的设备信息
@csrf_exempt
def display_cont_equip(request):
    try:
        data = json.loads(request.POST['data'])
        equips_info = Equip_regist_prod.objects.filter( contractno = data['contractno']).order_by('rank')
        if equips_info:
            data = []
            for equip_info  in equips_info:
                # time_aa = time.strftime('%Y.%m.%d',time.localtime(time.time()))
                # if len(str(equip_info.warranty_start_date)) == 10 and str(equip_info.warranty_start_date) == str(time_aa)[0:4]+'/'+str(time_aa)[5:7]+'/'+str(time_aa)[8:10]:
                    # start = ""
                # else:
                    # start = str(equip_info.warranty_start_date)[0:10]
                # if len(str(equip_info.warranty_end_date)) == 10 and str(equip_info.warranty_end_date) == str(time_aa)[0:4]+'/'+str(time_aa)[5:7]+'/'+str(time_aa)[8:10]:
                    # end = ''
                # else:
                    # end = str(equip_info.warranty_end_date)[0:10]
                if str(equip_info.warranty_start_date) == str(equip_info.warranty_end_date):
                    start = ""
                    end = ""
                else:
                    start = str(equip_info.warranty_start_date)[0:10]
                    end = str(equip_info.warranty_end_date)[0:10]
                data.append({
                    'id' : str(equip_info.id),
                    'contractno' : equip_info.contractno,
                    'brand' : equip_info.brand,
                    'type' : equip_info.type,
                    'model'  : equip_info.model,
                    'number' : equip_info.number,
                    'serial' : equip_info.serial,
                    'rank' : equip_info.rank,
                    'warranty_start_date' : start,
                    'warranty_end_date' : end,
                    'remake' : equip_info.remake,
                })
            return JsonResponse({'result': 1, 'data': data})
        else:
            return JsonResponse({'result': 0, 'data': []})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#修改设备登记信息
@csrf_exempt
def updata_change_equipment(request):
    try:
        data = json.loads(request.POST['data'])
        equip = data['equip']
        print equip
        equip_prod_info = Equip_regist_prod.objects.get( id = equip['id'])
        if equip_prod_info:
            equip_prod_info.brand = equip['brand']
            equip_prod_info.type = equip['type']
            equip_prod_info.model = equip['model']
            equip_prod_info.number = int(equip['num'])
            equip_prod_info.serial = equip['serial']
            equip_prod_info.remake = equip['remake']
            equip_prod_info.save()
            equip_info = Equip_regist.objects.get( id = data['id'] )
            if equip_info:
                equip_info.regis_name = data['regis_name']
                equip_info.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                equip_info.save()
                return JsonResponse({'result': 1, 'data': equip_prod_info.contractno})
            else:
                return JsonResponse({'result': 0, 'data': '该项目设备登记信息不存在'})
        else:
            return JsonResponse({'result': 0, 'data': '该设备登记不存在'})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': '修改失败'})
@csrf_exempt
def updata_add_equipment(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
            equip_info = Equip_regist.objects.get( id = data['id'] )
            if equip_info:
                equip_prod_info = Equip_regist_prod.objects.filter( contractno = equip_info.contractno).order_by('-rank').first()
                if equip_prod_info:
                    rank = equip_prod_info.rank
                else:
                    rank = 1
                i = 0 #新增的设备数量
                if len(data['equipment']) > 0:
                    for equipment in data['equipment']:
                        i = i + 1;
                        equipprod_info = Equip_regist_prod(
                            contractno = equip_info.contractno,
                            brand = equipment['brand'],
                            type = equipment['type'],
                            model = equipment['model'],
                            number = int(equipment['num'].encode("utf-8")),
                            serial = equipment['serial'],
                            remake = equipment['remake'],
                            rank = rank+i,
                        )
                        equipprod_info.save()
                    equip_info.regis_name = data['regis_name']
                    equip_info.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                    equip_info.count = (equip_info.count + i)
                    equip_info.save()
                    return JsonResponse({'result': 1, 'data': equip_info.contractno})
                return JsonResponse({'result': 0, 'data': '无新加设备'})
            return JsonResponse({'result': 0, 'data': '无此项目设备登记记录'})
        else:
            return render(request, 'login.html')
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '异常'})
   
#删除某一个项目的某一个设备登记记录
@csrf_exempt
def del_cont_equip(request):
    try:
        data = json.loads(request.POST['data'])
        Equip_regist_prod_info = Equip_regist_prod.objects.get( id = data['Equip_regist_prod_id'] )
        if Equip_regist_prod_info:
            Equip_regist_prod_info.delete()
            Equip_regist_info = Equip_regist.objects.get( id = data['Equip_regist_id'] )
            if Equip_regist_info:
                Equip_regist_info.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                Equip_regist_info.count = (Equip_regist_info.count -1)
                Equip_regist_info.save()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            return JsonResponse({'result': 0, 'data': '该记录不存在'})
        return JsonResponse({'result': 0, 'data': '该项目不存在'})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#查询某一序列号是否存在
@csrf_exempt
def check_equipment_serial(request):
    try:
        data = json.loads(request.POST['data'])
        Equip_regist_prod_info = Equip_regist_prod.objects.filter( serial = data['serial'] )
        if Equip_regist_prod_info:
            for info in Equip_regist_prod_info:
                if str(info.id) != str(data['id']):
                    return JsonResponse({'result': 0, 'data': '该序列号已存在'})
                else:
                    continue
            return JsonResponse({'result': 1, 'data': ''})
        else:
            return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': '异常'})
@csrf_exempt
def check_equipment_serial_list(request):
    try:
        data = json.loads(request.POST['data'])
        serial_list = data['serial']
        for inx, val in enumerate(serial_list):
            Equip_regist_prod_info = Equip_regist_prod.objects.filter( serial = val )
            if Equip_regist_prod_info:
                return JsonResponse({'result': 0, 'data': '第'+str(inx+1)+'个设备框的序列号已存在'})
            else:
                continue
        return JsonResponse({'result': 1, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': '异常'})
#筛选设备登记信息
@csrf_exempt
def chooseinfo_equipment_item(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])
            list_i = []
            list_j = []
            if data['contractno'] != "":
                list_i.append("contractno")
                list_j.append(data['contractno'])
            if data['projectname'] != "":
                list_i.append("projectname")
                list_j.append(data['projectname'])
            if data['dutyname'] != "":
                list_i.append("dutyname")
                list_j.append(data['dutyname'])
            dict_search = dict(zip(list_i,list_j))#转化为字典
            list_m = []
            list_n = []
            if data['serial'] != '':
                list_m.append("serial")
                list_n.append(data['serial'])
            if data['brand'] != "":
                list_m.append("brand")
                list_n.append(data['brand'])
            if data['type'] != "":
                list_m.append("type")
                list_n.append(data['type'])
            if data['model'] != "":
                list_m.append("model")
                list_n.append(data['model'])
            dict_search1 = dict(zip(list_m,list_n))#转化为字典
            datas=[]
            if dict_search=={} and dict_search1=={}:
                equips_info = Equip_regist.objects.filter().order_by('-equip_regis_latest')
                if equips_info:
                    for equip_info in equips_info:
                        datas.append({
                            'id' : str(equip_info.id),
                            'contractno' : equip_info.contractno,
                            'projectname' : equip_info.projectname,
                            'dutyname' : equip_info.dutyname,
                            'regis_name'  : equip_info.regis_name,
                            'equip_regis' : equip_info.equip_regis,
                            'equip_regis_latest' : equip_info.equip_regis_latest,
                            'remake' : equip_info.remake,
                            'count' : equip_info.count,
                        })
                    # return JsonResponse({'result':1,'data':datas})
            elif dict_search=={} and dict_search1!={}:
                prods = Equip_regist_prod.objects.filter(**dict_search1).all().order_by('rank')
                if prods:
                    cont_list = []
                    for prod in prods:
                        if prod.contractno not in cont_list:
                            cont_list.append(prod.contractno)
                    for cont in cont_list:
                        equips_info = Equip_regist.objects.filter(Q(contractno = cont)).order_by('-equip_regis_latest')
                        if equips_info:
                            for equip_info in equips_info:
                                datas.append({
                                    'id' : str(equip_info.id),
                                    'contractno' : equip_info.contractno,
                                    'projectname' : equip_info.projectname,
                                    'dutyname' : equip_info.dutyname,
                                    'regis_name'  : equip_info.regis_name,
                                    'equip_regis' : equip_info.equip_regis,
                                    'equip_regis_latest' : equip_info.equip_regis_latest,
                                    'remake' : equip_info.remake,
                                    'count' : equip_info.count,
                                })
                        else:
                            continue
                # else:
                    # datas=[]
            elif dict_search!={} and dict_search1=={}:
                equips_info = Equip_regist.objects.filter(**dict_search).all().order_by('-equip_regis_latest')
                if equips_info:
                    for equip_info in equips_info:
                        datas.append({
                            'id' : str(equip_info.id),
                            'contractno' : equip_info.contractno,
                            'projectname' : equip_info.projectname,
                            'dutyname' : equip_info.dutyname,
                            'regis_name'  : equip_info.regis_name,
                            'equip_regis' : equip_info.equip_regis,
                            'equip_regis_latest' : equip_info.equip_regis_latest,
                            'remake' : equip_info.remake,
                            'count' : equip_info.count,
                        })
            else:
                equips_info = Equip_regist.objects.filter(**dict_search).all().order_by('-equip_regis_latest')
                prods = Equip_regist_prod.objects.filter(**dict_search1).all().order_by('rank')
                if prods and equips_info:
                    cont_list = []
                    for prod in prods:
                        if prod.contractno not in cont_list:
                            cont_list.append(prod.contractno)
                    for equip_info in equips_info:
                        if equip_info.contractno in cont_list:
                            datas.append({
                                'id' : str(equip_info.id),
                                'contractno' : equip_info.contractno,
                                'projectname' : equip_info.projectname,
                                'dutyname' : equip_info.dutyname,
                                'regis_name'  : equip_info.regis_name,
                                'equip_regis' : equip_info.equip_regis,
                                'equip_regis_latest' : equip_info.equip_regis_latest,
                                'remake' : equip_info.remake,
                                'count' : equip_info.count,
                            })
                        else:
                            continue
            return JsonResponse({'result':1,'data':datas})
        else:
            return render(request, 'login.html')
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': 'error！'})
#显示设备元数据
@csrf_exempt
def display_equip_meta(request):
    infos = Equip_prod.objects.filter().all().order_by('brand','type','model')
    try:
        if infos:
            datas = []
            for info in infos:
                datas.append({
                    'id': str(info.id),
                    'brand': info.brand,
                    'type': info.type,
                    'model': info.model
                })
            return JsonResponse({'result': 1, 'data': datas})
        else:
            data_result = []
            return JsonResponse({'result': 1, 'data': data_result})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#添加设备元数据
@csrf_exempt
def add_equip_meta(request):
    try:
        data = json.loads(request.POST['data'])
        b = data['brand'].replace("\\s+",' ')
        t = data['type'].replace("\\s+",' ')
        m = data['model'].replace("\\s+",' ')
        p = Equip_prod.objects.filter(Q(brand=b)&Q(type=t)&Q(model=m))
        if p:
            return JsonResponse({'result': 2, 'data': '已存在'})
        else:
            prod = Equip_prod(
                brand=b,
                type=t,
                model=m,
            )
            prod.save()
            return JsonResponse({'result': 1, 'data': '添加成功'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#删除设备元数据
@csrf_exempt
def del_equip_meta(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            prod=Equip_prod.objects.get(id=data['id'])
            if prod:
                prod.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '删除失败'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})
#修改设备元数据
@csrf_exempt
def update_equip_meta(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            prod = Equip_prod.objects.get(id=data['id'])
            b = data['brand'].replace("\\s+",' ')
            t = data['type'].replace("\\s+",' ')
            m = data['model'].replace("\\s+",' ')
            p = Equip_prod.objects.filter(Q(brand=b)&Q(type=t)&Q(model=m))
            if p:
                return JsonResponse({'result': 2, 'data': '已存在'})
            else:
                if prod:
                    prod.brand = b
                    prod.type = t
                    prod.model = m
                    prod.save()
                    return JsonResponse({'result': 1, 'data': '修改成功'})
                else:
                    return JsonResponse({'result': 0, 'data': ''})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
        
#筛选设备元数据
@csrf_exempt
def select_equipment_meta(request):
    try:
        if request.session.get('is_login', None):
            data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
            brand = data["brand"]
            type = data["type"]
            model = data["model"]
            list_i = []
            list_j = []
            if brand != "":
                list_i.append("brand")
                list_j.append(brand)
            if type != "":
                list_i.append("type")
                list_j.append(type)
            if model != "":
                list_i.append("model")
                list_j.append(model)
            dict_search = dict(zip(list_i,list_j))#转化为字典
            equip_prods_info = Equip_prod.objects.filter(**dict_search).all()
            if equip_prods_info:
                data = []
                for equip_prod_info in equip_prods_info:
                    data.append({
                        'id': str(equip_prod_info.id),
                        'brand': equip_prod_info.brand,
                        'type': equip_prod_info.type,
                        'model': equip_prod_info.model,
                    })
                return JsonResponse({'result': 1, 'data': data})
            else:
                datas = []
                return JsonResponse({'result': 1, 'data': datas})
        else:
            return render(request, 'login.html')

    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '查询失败'})

#system导入项目设备信息txt
@csrf_exempt
def upload_equpment(request):
    if request.session.get('is_login', None):
        try:
            if request.method == 'POST':
                files_name = request.FILES.getlist('file', None)#文件
                files = request.FILES.get('file')#文件名
                for file in files:
                    if not file:
                        return HttpResponse('文件读取失败')
                    cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                    info_path = cc + '/static/uploads/info'

                    for file_name in files_name:
                        write_file = open(info_path + '/' + file_name.name, 'wb')
                        for chunk in file_name.chunks():
                            write_file.write(chunk)
                        write_file.close()

                for file_name in files_name:
                    cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                    info_path = cc + '/static/uploads/info'
                    file = open(info_path + '/' + file_name.name,'r')
                    i = 0#记录文本循环的行数
                    format_list = []#记录格式出错的行号
                    contract_list = []#记录不存在的项目编号
                    equipment_list = []#记录设备元数据不存在的行号
                    number_list = []#记录数量出错的行号
                    serial_list = []#记录序列号重复的行号
                    text_serial_list1 = []#记录上传的文件中的序列号
                    text_serial_list = []#记录上传的文件中重复序列号的行号
                    # Equip_prod.objects.filter(Q(brand=b)&Q(type=t)&Q(model=m))
                    try:
                        while True:
                            i = i + 1
                            text = file.readline().strip()#读取一行内容
                            if text and len(text) > 0 :
                                text = text.decode("gbk")
                                line_list = text.split(',')
                                if len(line_list) == 6:
                                    if (len(line_list[0])== 0 or len(line_list[1])== 0 or len(line_list[2])== 0 or len(line_list[3])== 0 or len(line_list[4])==0 or len(line_list[5])== 0):
                                        format_list.append(i)
                                    work_infos = work.objects.filter( contractno=line_list[0] )
                                    if (len(work_infos)==0) and (line_list[0] not in contract_list):
                                        contract_list.append(line_list[0])
                                    equip_prod_info = Equip_prod.objects.filter(brand=line_list[1])
                                    if len(equip_prod_info)==0:
                                        equipment_list.append(i)
                                    else:
                                        equip_prod_info = Equip_prod.objects.filter(Q(brand=line_list[1])&Q(type=line_list[2]))
                                        if len(equip_prod_info)==0:
                                            equipment_list.append(i)
                                        else:
                                            equip_prod_info = Equip_prod.objects.filter(Q(brand=line_list[1])&Q(type=line_list[2])&Q(model=line_list[3]))
                                            if len(equip_prod_info)==0:
                                                equipment_list.append(i)
                                    if line_list[4] != '1':
                                        number_list.append(i)
                                    equip_regist_prod = Equip_regist_prod.objects.filter(serial=line_list[5])
                                    if equip_regist_prod:
                                        serial_list.append(i)
                                    if line_list[5] not in text_serial_list1:
                                        text_serial_list1.append(line_list[5])
                                    else:
                                        text_serial_list.append(line_list[5])
                                else:
                                    format_list.append(i)
                                    continue
                            else:
                                break
                        if format_list==[] and contract_list==[] and equipment_list==[] and number_list==[] and serial_list==[] and text_serial_list==[]:
                            # file.seek(0)  #光标的位置移动到文件开始位置
                            data = [[0],[0],[0],[0],[0],[0],file_name.name]
                            return JsonResponse({'result': 1, 'data': data})
                        else:
                            file.close()
                            os.remove(info_path + '/' + file_name.name)#删除文件
                            data = [format_list,contract_list,equipment_list,number_list,serial_list,text_serial_list,file_name.name]
                            return JsonResponse({'result': 2, 'data': data})
                    
                    except Exception as e:
                        print (e)
                        file.close()
                        os.remove(info_path + '/' + file_name.name)#删除文件
                        return JsonResponse({'result': 0, 'data': '异常'})
                    finally:
                        file.close()
        except Exception as e:
             print (e)
             return JsonResponse({'result': 0, 'data': '异常'})
    else:
        return render(request, 'login.html')

#system确认导入信息设备文件到数据库
@csrf_exempt
def import_equipment_data_to_db(request):
    try:
        data = json.loads(request.POST['data1'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        info_path = cc + '/static/uploads/info'
        file = open(info_path + '/' + data['file_name'],'r')
        try:
            contractnolist = []#保存更新过的项目的合同编号
            while True:
                text = file.readline().strip() #读取一行内容，并去除前后空格
                if text and len(text) > 1:
                    line_list = text.decode("gbk").split(',')
                    equip_regist_prod_infos = Equip_regist_prod.objects.filter(contractno=line_list[0]).order_by('-rank').first()#要添加的记录对应的项目是否已有设备记录，
                    if equip_regist_prod_infos:
                        rank_1 = int(equip_regist_prod_infos.rank) + 1
                        info = Equip_regist_prod(
                            contractno = line_list[0],
                            brand = line_list[1],
                            type = line_list[2],
                            model = line_list[3],
                            number = (line_list[4].encode("utf-8")),
                            serial = line_list[5],
                            rank = rank_1,
                            remake = '',
                        )
                        info.save()
                    else:
                        info = Equip_regist_prod(
                            contractno = line_list[0],
                            brand = line_list[1],
                            type = line_list[2],
                            model = line_list[3],
                            number = (line_list[4].encode("utf-8")),
                            serial = line_list[5],
                            rank = 1,
                            remake = '',
                        )
                        info.save()
                    if line_list[0] not in contractnolist:
                        contractnolist.append(line_list[0])
                else:
                    break
            for cont in contractnolist:
                work_info = work.objects.filter(contractno=cont).first()#按合同编号查询,取第一条
                equip_regist_infos = Equip_regist.objects.filter(contractno=cont).first()#要添加的记录的项目是否已有记录，
                equip_regist_prod_infos_count = len(Equip_regist_prod.objects.filter(contractno=cont))
                if equip_regist_infos:
                    equip_regist_infos.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                    equip_regist_infos.count = equip_regist_prod_infos_count
                    equip_regist_infos.save()
                else:
                    equip_regist_infos = Equip_regist(
                        contractno = cont,
                        projectname = work_info.projectname,
                        dutyname = work_info.dutyname,
                        regis_name = data['regis_name'],
                        equip_regis = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                        equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                        remake = '',
                        count = equip_regist_prod_infos_count,
                    )
                    equip_regist_infos.save()
            return JsonResponse({'result': 1 , 'data': '导入成功'})
        except Exception as e:
            print (e)
            return JsonResponse({'result': 0, 'data': ''})
        finally:
            file.close()
            os.remove(info_path + '/' + data['file_name'])#删除文件
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})
                            
#system删除导入的信息设备文件
@csrf_exempt
def delete_equipment_file_from_server(request):
    try:
        data = json.loads(request.POST['data1'])
        cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        info_path = cc + '/static/uploads/info'
        os.remove(info_path + '/' + data['file_name'])#删除文件
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#更新维保 equip_regis_latest
@csrf_exempt
def update_warranty_cont(request):
    try:
        data = json.loads(request.POST['data'])
        # print data
        #从数据库查询到数据
        equips_info = Equip_regist_prod.objects.filter( contractno = data['contractno']).order_by('rank')
        i = 0
        if equips_info:
            for equip_info in equips_info:
                list = [equip_info.contractno,equip_info.brand,equip_info.type,equip_info.model,equip_info.number,equip_info.serial,str(equip_info.id)]
                slist = check_warranty.check(list)
                start = str(equip_info.warranty_start_date)[0:10]
                end = str(equip_info.warranty_end_date)[0:10]
                if slist[7] != '0/0/0' and  slist[8] != '0/0/0':
                    if '/' in slist[7]:
                        list_tmp = slist[7].split('/')
                        if len(list_tmp[1]) == 1:
                            list_tmp[1] = '0' + list_tmp[1]
                        if len(list_tmp[2]) == 1:
                            list_tmp[2] = '0' + list_tmp[2]
                        start = list_tmp[0] + '-' + list_tmp[1] + '-' + list_tmp[2]
                    elif '-' in slist[7]:
                        list_tmp = slist[7].split('-')
                        if len(list_tmp[1]) == 1:
                            list_tmp[1] = '0' + list_tmp[1]
                        if len(list_tmp[2]) == 1:
                            list_tmp[2] = '0' + list_tmp[2]
                        start = list_tmp[0] + '-' + list_tmp[1] + '-' + list_tmp[2]
                    if '/' in slist[8]:
                        list_tmp = slist[8].split('/')
                        if len(list_tmp[1]) == 1:
                            list_tmp[1] = '0' + list_tmp[1]
                        if len(list_tmp[2]) == 1:
                            list_tmp[2] = '0' + list_tmp[2]
                        end = list_tmp[0] + '-' + list_tmp[1] + '-' + list_tmp[2]
                    elif '-' in slist[8]:
                        list_tmp = slist[8].split('-')
                        if len(list_tmp[1]) == 1:
                            list_tmp[1] = '0' + list_tmp[1]
                        if len(list_tmp[2]) == 1:
                            list_tmp[2] = '0' + list_tmp[2]
                        end = list_tmp[0] + '-' + list_tmp[1] + '-' + list_tmp[2]
                    # start = slist[7][0:4]+'-'+slist[7][5:7]+'-'+slist[7][8:10]
                    # end = slist[8][0:4]+'-'+slist[8][5:7]+'-'+slist[8][8:10]
                    # print start 
                    # print str(equip_info.warranty_start_date)[0:10] 
                    if start != str(equip_info.warranty_start_date)[0:10] or end != str(equip_info.warranty_end_date)[0:10]:
                        info = Equip_regist_prod.objects.get(id=equip_info.id)
                        if info:
                            info.warranty_start_date = start
                            info.warranty_end_date = end
                            info.save()
                            info1 = Equip_regist.objects.get(contractno=equip_info.contractno)
                            i += 1
                            if info1:
                                info1.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                                info1.save()
                    else:
                        continue
                else:
                    continue
            return JsonResponse({'result': 1, 'data': str(i) })
        else:
            return JsonResponse({'result': 2, 'data': '该项目无设备登记信息'})
    except Exception as e:
        print (e)
        return JsonResponse({'result': 0, 'data': ''})

#增加项目人员投入信息
@csrf_exempt
def add_personnel_input(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            info = Personnel_input.objects.filter(contractno = data['cont'])
            if info:
                return JsonResponse({'result': 2, 'data': '该项目已存在预计人员投入'})
            else:
                input = Personnel_input(
                    contractno=data['cont'],
                    imp_primary=data['imp_primary'],
                    imp_primary_add='0',
                    imp_intermediate=data['imp_intermediate'],
                    imp_intermediate_add='0',
                    imp_senior=data['imp_senior'],
                    imp_senior_add='0',
                    imp_senior_plus=data['imp_senior_plus'],
                    imp_senior_plus_add='0',
                    imp_other=data['imp_other_level'],
                    imp_other_add='0',
                    gua_primary=data['gua_primary'],
                    gua_primary_add='0',
                    gua_intermediate=data['gua_intermediate'],
                    gua_intermediate_add='0',
                    gua_senior=data['gua_senior'],
                    gua_senior_add='0',
                    gua_senior_plus=data['gua_senior_plus'],
                    gua_senior_plus_add='0',
                    gua_other=data['gua_other_level'],
                    gua_other_add='0',
                    remake=data['personnel_input_remake'],
                    add_date=time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                    update_date=time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                )
                input.save()
                return JsonResponse({'result': 1, 'data': '添加成功'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

#查询所有项目的人员投入
@csrf_exempt
def display_personnel_input(request):
    if request.session.get('is_login', None):
        try:
            infos = Personnel_input.objects.filter().all().order_by('-update_date')
            if infos:
                datas = []
                for info in infos:
                    info_cont = work.objects.get(contractno = info.contractno)
                    if info_cont:
                        datas.append({
                            'id': str(info.id),
                            'contractno': info.contractno,
                            'projectname': info_cont.projectname,
                            'dutyname': info_cont.dutyname,
                            'imp_primary': info.imp_primary,
                            'imp_primary_add': info.imp_primary_add,
                            'imp_intermediate': info.imp_intermediate,
                            'imp_intermediate_add': info.imp_intermediate_add,
                            'imp_senior': info.imp_senior,
                            'imp_senior_add': info.imp_senior_add,
                            'imp_senior_plus': info.imp_senior_plus,
                            'imp_senior_plus_add': info.imp_senior_plus_add,
                            'imp_other': info.imp_other,
                            'imp_other_add': info.imp_other_add,
                            'gua_primary': info.gua_primary,
                            'gua_primary_add': info.gua_primary_add,
                            'gua_intermediate': info.gua_intermediate,
                            'gua_intermediate_add': info.gua_intermediate_add,
                            'gua_senior': info.gua_senior,
                            'gua_senior_add': info.gua_senior_add,
                            'gua_senior_plus': info.gua_senior_plus,
                            'gua_senior_plus_add': info.gua_senior_plus_add,
                            'gua_other': info.gua_other,
                            'gua_other_add': info.gua_other_add,
                            'remake': info.remake,
                            'add_date': info.add_date,
                            'update_date': info.update_date
                        })
                    else:
                        JsonResponse({'result': 0, 'data': ''})
                return JsonResponse({'result': 1, 'data': datas})
            else:
                data_result = []
                return JsonResponse({'result': 1, 'data': data_result})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

# 修改人员投入信息
@csrf_exempt
def update_personnel_input(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            info = Personnel_input.objects.get(id=data['id'])
            if info:
                # info1 = Personnel_input.objects.get(contractno = data['cont'])
                # if info1 and str(info1.id) != data['id']:
                    # return JsonResponse({'result': 2, 'data': '该合同已存在人员投入信息'})
                # else:
                # info.contractno = data['cont']
                info.imp_primary_add = data['imp_primary_add']
                info.imp_intermediate_add = data['imp_intermediate_add']
                info.imp_senior_add = data['imp_senior_add']
                info.imp_senior_plus_add = data['imp_senior_plus_add']
                info.imp_other_add = data['imp_other_level_add']
                info.gua_primary_add = data['gua_primary_add']
                info.gua_intermediate_add = data['gua_intermediate_add']
                info.gua_senior_add = data['gua_senior_add']
                info.gua_senior_plus_add = data['gua_senior_plus_add']
                info.gua_other_add = data['gua_other_level_add']
                info.remake = data['personnel_input_remake']
                info.update_date = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                info.save()
                return JsonResponse({'result': 1, 'data': '修改成功'})
            # else:
                # return JsonResponse({'result': 0, 'data': '不存在'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

#删除人员投入信息数据
@csrf_exempt
def del_personnel_input(request):
    try:
        data = json.loads(request.POST['data'])
        try:
            info=Personnel_input.objects.get(id=data['id'])
            if info:
                info.delete()
                return JsonResponse({'result': 1, 'data': '删除成功'})
            else:
                return JsonResponse({'result': 0, 'data': '删除失败'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': '删除失败'})

#查询某项目的绩效
@csrf_exempt
def display_cont_performance(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            info_input = Personnel_input.objects.filter(contractno = data['cont']).first()
            infos_project = Project.objects.filter(contractno = data['cont'])
            if infos_project:
                primary_num = 0
                primary_num1 = 0
                intermediate_num = 0
                intermediate_num1 = 0
                senior_num = 0
                senior_num1 = 0
                senior_plus_num = 0
                senior_plus_num1 = 0
                other_num = 0
                other_num1 = 0
                workload_input = []
                total_workload = 0
                for info_project in infos_project:
                    total_workload += float(info_project.workload)
                    if info_project.state_flag == 'S1':
                        if info_project.level == '0.7':
                            primary_num += float(info_project.workload)
                        elif info_project.level == '1.0' or info_project.level == '1':
                            intermediate_num += float(info_project.workload)
                        elif info_project.level == '1.5':
                            senior_num += float(info_project.workload)
                        elif info_project.level == '2.0' or info_project.level == '2':
                            senior_plus_num += float(info_project.workload)
                        else:
                            other_num += float(info_project.workload)
                    elif info_project.state_flag == 'S0':
                        if info_project.level == '0.7':
                            primary_num1 += float(info_project.workload)
                        elif info_project.level == '1.0' or info_project.level == '1':
                            intermediate_num1 += float(info_project.workload)
                        elif info_project.level == '1.5':
                            senior_num1 += float(info_project.workload)
                        elif info_project.level == '2.0' or info_project.level == '2':
                            senior_plus_num1 += float(info_project.workload)
                        else:
                            other_num1 += float(info_project.workload)
                    else:
                        continue
                    tmp = {"worktype":info_project.worktype,"workitem":info_project.workitem,"workload":float(info_project.workload)}
                    if len(workload_input) == 0:
                        workload_input.append(tmp)
                    else:
                        for i in workload_input:
                            if i['worktype'] == tmp['worktype'] and i['workitem'] == tmp['workitem']:
                                i['workload'] += tmp['workload']
                                tmp['workload'] = 0 
                                break
                            else:
                                continue
                        if tmp['workload'] != 0:
                            workload_input.append(tmp)
                # 按照workload降序对列表排序
                workload_input1 = sorted(workload_input, key=lambda x : x['workload'], reverse=True)
            if info_input:
                if infos_project:
                    data_result = [{'imp_primary':info_input.imp_primary,'imp_primary_add':info_input.imp_primary_add,'imp_intermediate':info_input.imp_intermediate,'imp_intermediate_add':info_input.imp_intermediate_add,'imp_senior':info_input.imp_senior,'imp_senior_add':info_input.imp_senior_add,'imp_senior_plus':info_input.imp_senior_plus,'imp_senior_plus_add':info_input.imp_senior_plus_add,'imp_other': info_input.imp_other,'imp_other_add': info_input.imp_other_add,'gua_primary':info_input.gua_primary,'gua_primary_add':info_input.gua_primary_add,'gua_intermediate':info_input.gua_intermediate,'gua_intermediate_add':info_input.gua_intermediate_add,'gua_senior':info_input.gua_senior,'gua_senior_add':info_input.gua_senior_add,'gua_senior_plus':info_input.gua_senior_plus,'gua_senior_plus_add':info_input.gua_senior_plus_add,'gua_other': info_input.gua_other,'gua_other_add': info_input.gua_other_add,'primary':primary_num,'primary1':primary_num1,'intermediate':intermediate_num,'intermediate1':intermediate_num1,'senior':senior_num,'senior1':senior_num1,'senior_plus':senior_plus_num,'senior_plus1':senior_plus_num1,'other': other_num,'other1': other_num1,'workload_input':workload_input1,'total_workload':total_workload}]
                    return JsonResponse({'result': 1, 'data': data_result})
                else:
                    data_result = [{'imp_primary':info_input.imp_primary,'imp_primary_add':info_input.imp_primary_add,'imp_intermediate':info_input.imp_intermediate,'imp_intermediate_add':info_input.imp_intermediate_add,'imp_senior':info_input.imp_senior,'imp_senior_add':info_input.imp_senior_add,'imp_senior_plus':info_input.imp_senior_plus,'imp_senior_plus_add':info_input.imp_senior_plus_add,'imp_other': info_input.imp_other,'imp_other_add': info_input.imp_other_add,'gua_primary':info_input.gua_primary,'gua_primary_add':info_input.gua_primary_add,'gua_intermediate':info_input.gua_intermediate,'gua_intermediate_add':info_input.gua_intermediate_add,'gua_senior':info_input.gua_senior,'gua_senior_add':info_input.gua_senior_add,'gua_senior_plus':info_input.gua_senior_plus,'gua_senior_plus_add':info_input.gua_senior_plus_add,'gua_other': info_input.gua_other,'gua_other_add': info_input.gua_other_add,'primary':'0','intermediate':'0','senior':'0','senior_plus':'0','other': '0','primary1':'0','intermediate1':'0','senior1':'0','senior_plus1':'0','other1': '0','workload_input':[],'total_workload':'0'}]
                    return JsonResponse({'result': 1, 'data': data_result})
            else:
                if infos_project:
                    data_result = [{'imp_primary':'0','imp_primary_add':'0','imp_intermediate':'0','imp_intermediate_add':'0','imp_senior':'0','imp_senior_add':'0','imp_senior_plus':'0','imp_senior_plus_add':'0','imp_other': '0','imp_other_add': '0','gua_primary':'0','gua_primary_add':'0','gua_intermediate':'0','gua_intermediate_add':'0','gua_senior':'0','gua_senior_add':'0','gua_senior_plus':'0','gua_senior_plus_add':'0','gua_other': '0','gua_other_add': '0','primary':primary_num,'primary1':primary_num1,'intermediate':intermediate_num,'intermediate1':intermediate_num1,'senior':senior_num,'senior1':senior_num1,'senior_plus':senior_plus_num,'senior_plus1':senior_plus_num1,'other': other_num,'other1': other_num1,'workload_input':workload_input1,'total_workload':total_workload}]
                    return JsonResponse({'result': 1, 'data': data_result})
                else:
                    data_result = [{'imp_primary':'0','imp_primary_add':'0','imp_intermediate':'0','imp_intermediate_add':'0','imp_senior':'0','imp_senior_add':'0','imp_senior_plus':'0','imp_senior_plus_add':'0','imp_other': '0','imp_other_add': '0','gua_primary':'0','gua_primary_add':'0','gua_intermediate':'0','gua_intermediate_add':'0','gua_senior':'0','gua_senior_add':'0','gua_senior_plus':'0','gua_senior_plus_add':'0','gua_other': '0','gua_other_add': '0','primary':'0','intermediate':'0','senior':'0','senior_plus':'0','other': '0','primary1':'0','intermediate1':'0','senior1':'0','senior_plus1':'0','other1': '0','workload_input':[],'total_workload':'0'}]
                    return JsonResponse({'result': 1, 'data': data_result})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')
# 查询某人员的绩效
@csrf_exempt
def query_per_per(request):
    if request.session.get('is_login',None):
        try:
            data = json.loads(request.POST['data'])
            type = 0 
            total_workload = 0
            header = '' 
            if (data['month'] == '' and data['year'] == ''):
                type = 3
                header = data['projectname']  #XX项目
            elif (data['cont'] == '' and data['projectname'] == ''):
                if (data['month'] == '00'):
                    type = 1
                    header = data['year']+'年'  #某年
                else:
                    type = 2
                    header = data['year'] +'年'+ data['month'] +'月'  #某年某月
            else:
                if (data['month'] == '00'):
                    type = 4
                    header = data['year']+'年该项目'  #某年某项目
                else:
                    type = 5
                    header = data['year'] +'年'+ data['month'] +'月该项目'#某年某月某项目
            list_i = []
            list_j = []
            if data['cont'] != "":
                list_i.append("contractno")
                list_j.append(data['cont'])
            if data['projectname'] != "":
                list_i.append("projectname")
                list_j.append(data['projectname'])
            if data['username'] != "":
                list_i.append("membername")
                list_j.append(data['username'])
            dict_search = dict(zip(list_i,list_j))#转化为字典
            project_infos = []
            if str(data['year']) != '' and str(data['month']) != '':
                if str(data['month']) == '00':
                    start = data['year']+'-01-01'
                    end = data['year']+'-12-31'
                    project_infos = Project.objects.filter(Q(workdate__gte = start)&Q(workdate__lte = end)).filter(**dict_search).all().order_by('-workdate')
                else :
                    start = data['year']+'-'+ data['month'] + '-01'
                    end = data['year']+ '-' + data['month'] + '-' + str(calendar.monthrange(int(data['year']),int(data['month']))[1])
                    project_infos = Project.objects.filter(Q(workdate__gte = start)&Q(workdate__lte = end)).filter(**dict_search).all().order_by('-workdate')
            else:
                project_infos = Project.objects.filter(**dict_search).all().order_by('-workdate')
            if project_infos:
                workload_input = []#工作项的投入
                workload_input1 = []#某项目的投入
                for project_info in project_infos:
                    total_workload += float(project_info.workload)
                    tmp = {"worktype":project_info.worktype,"workitem":project_info.workitem,"workload":float(project_info.workload)}
                    tmp1 = {"projectname":project_info.projectname,"workload":float(project_info.workload)}
                    if len(workload_input) == 0:
                        workload_input.append(tmp)
                    else:
                        for i in workload_input:
                            if i['worktype'] == tmp['worktype'] and i['workitem'] == tmp['workitem']:
                                i['workload'] += tmp['workload']
                                tmp['workload'] = 0 
                                break
                            else:
                                continue
                        if tmp['workload'] != 0:
                            workload_input.append(tmp)
                    if len(workload_input1) == 0:
                        workload_input1.append(tmp1)
                    else:
                        for j in workload_input1:
                            if j['projectname'] == tmp1['projectname']:
                                j['workload'] += tmp1['workload']
                                tmp1['workload'] = 0
                                break
                            else:
                                continue
                        if tmp1['workload'] != 0:
                            workload_input1.append(tmp1)
                # 按照workload降序对列表排序
                workload_input = sorted(workload_input, key=lambda x : x['workload'], reverse=True)
                workload_input1 = sorted(workload_input1, key=lambda x : x['workload'], reverse=True)
                #获取前五个项目的投入情况    效率有待优化，所有数据查询过一次，这里又查了
                cont_top = []
                workload_input1_top9 = 0#只做前9次
                for l in workload_input1: 
                    workload_input2 = []
                    if (workload_input1_top9 >= 9):
                        break
                    else:
                        # infos = Project.objects.filter(projectname = l['projectname'])
                        if str(data['year']) != '' and str(data['month']) != '':
                            if str(data['month']) == '00':
                                start = data['year']+'-01-01'
                                end = data['year']+'-12-31'
                                infos = Project.objects.filter(Q(workdate__gte = start)&Q(workdate__lte = end)).filter(membername = data['username']).filter(projectname = l['projectname']).all()
                            else :
                                start = data['year']+'-'+ data['month'] + '-01'
                                end = data['year']+ '-' + data['month'] + '-' + str(calendar.monthrange(int(data['year']),int(data['month']))[1])
                                infos = Project.objects.filter(Q(workdate__gte = start)&Q(workdate__lte = end)).filter(membername = data['username']).filter(projectname = l['projectname']).all()
                        else:
                            infos = Project.objects.filter(membername = data['username']).filter(projectname = l['projectname']).all()
                        ont_cont_total_workload = 0
                        for info in infos:
                            ont_cont_total_workload = ont_cont_total_workload + float(info.workload)
                            tmp2 = {"worktype":info.worktype,"workitem":info.workitem,"workload":float(info.workload)}
                            if len(workload_input2) == 0:
                                workload_input2.append(tmp2)
                            else:
                                for i in workload_input2:
                                    if i['worktype'] == tmp2['worktype'] and i['workitem'] == tmp2['workitem']:
                                        i['workload'] += tmp2['workload']
                                        tmp2['workload'] = 0 
                                        break
                                    else:
                                        continue
                                if tmp2['workload'] != 0:
                                    workload_input2.append(tmp2)
                        # 按照workload降序对列表排序
                        workload_input2 = sorted(workload_input2, key=lambda x : x['workload'], reverse=True)
                        ttmp = {'workload_input2':workload_input2,'ont_cont_total_workload':ont_cont_total_workload,'projectname':l['projectname']}
                        cont_top.append(ttmp)
                    workload_input1_top9 = workload_input1_top9 + 1 
                data = {'type':type,'header':header,'dataone':workload_input,'datatwo':workload_input1,'total_workload':total_workload,'cont_top9':cont_top}
                return JsonResponse({'result': 1, 'data': data})
            else:
                return JsonResponse({'result': 2, 'data': {'type':type,'header':header}})
        except Exception as e:
            print(e)
            s = sys.exc_info()
            print "Error '%s' happened on line %d" % (s[1],s[2].tb_lineno)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request,'login.html');
# 查询某项目的人员预估
@csrf_exempt
def search_personnel_input(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            infos = Personnel_input.objects.filter(contractno = data['cont'])
            if infos:
                datas = []
                for info in infos:
                    info_cont = work.objects.get(contractno = info.contractno)
                    if info_cont:
                        datas.append({
                            'id': str(info.id),
                            'contractno': info.contractno,
                            'projectname': info_cont.projectname,
                            'dutyname': info_cont.dutyname,
                            'imp_primary': info.imp_primary,
                            'imp_primary_add': info.imp_primary_add,
                            'imp_intermediate': info.imp_intermediate,
                            'imp_intermediate_add': info.imp_intermediate_add,
                            'imp_senior': info.imp_senior,
                            'imp_senior_add': info.imp_senior_add,
                            'imp_senior_plus': info.imp_senior_plus,
                            'imp_senior_plus_add': info.imp_senior_plus_add,
                            'imp_other': info.imp_other,
                            'imp_other_add': info.imp_other_add,
                            'gua_primary': info.gua_primary,
                            'gua_primary_add': info.gua_primary_add,
                            'gua_intermediate': info.gua_intermediate,
                            'gua_intermediate_add': info.gua_intermediate_add,
                            'gua_senior': info.gua_senior,
                            'gua_senior_add': info.gua_senior_add,
                            'gua_senior_plus': info.gua_senior_plus,
                            'gua_senior_plus_add': info.gua_senior_plus_add,
                            'gua_other': info.gua_other,
                            'gua_other_add': info.gua_other_add,
                            'remake': info.remake,
                            'add_date': info.add_date,
                            'update_date': info.update_date
                        })
                    else:
                        JsonResponse({'result': 0, 'data': ''})
                return JsonResponse({'result': 1, 'data': datas})
            else:
                data_result = []
                return JsonResponse({'result': 1, 'data': data_result})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')
#上传共享文件到/static/uploads/soft_file
@csrf_exempt
def upload_file_soft(request):
    if request.session.get('is_login', None):
        if request.method == 'POST':
            files_name = request.FILES.getlist('file', None)
            files = request.FILES.get('file')
            i = 0
            for file in files:
                if not file:
                    return JsonResponse({'result':0,'data':'文件读取失败'})
                cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                info_path = cc + '/static/uploads/soft_file'  
                name = []#上传成功的文件名
                name1 = []#已存在的文件名
                for file_name in files_name:
                    files_info = Sharing_file.objects.filter(filename = file_name.name)
                    if files_info:
                        name1.append(file_name.name)
                    else:
                        write_file = open(info_path + '/' + file_name.name, 'wb')
                        for chunk in file_name.chunks():
                            write_file.write(chunk)
                        write_file.close()
                        name.append(file_name.name)
                return JsonResponse({'result':1,'data':'文件上传成功','name':name})
    else:
        return render(request, 'login.html')
# 上传共享文件到/static/uploads/soft_file后，写入数据库记录
@csrf_exempt
def upload_file_soft_wdb(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            for f in data['file_Size']:
                file = Sharing_file(
                    filename = f['filename'],
                    sharename= data['sharename'],
                    filesize= f['filesize'],
                    sharedate= time.strftime('%Y%m%d%H%M%S',time.localtime(time.time())),
                    downloadcounte= 0
                )
                file.save()
            return JsonResponse({'result': 1, 'data': 'success'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')
# 检查数据库中是否有同名文件
@csrf_exempt
def check_upload_filename_same(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            list = []
            for f in data['namelist']:
                infos_file = Sharing_file.objects.filter(filename = f).all()
                # 数据库有相同文件名则返回该文件名，无则返回空
                if infos_file:
                    list.append(f)
            return JsonResponse({'result': 1, 'data': list})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

#从Share_file数据库查询记录
@csrf_exempt
def select_share_file(request):
    if request.session.get('is_login', None):
        try:
            data = json.loads(request.POST['data'])
            if data['keyword']:
                infos_file = Sharing_file.objects.filter(filename__icontains=data['keyword']).all().order_by('-downloadcounte')#filename__icontains名称中包含XXX不区分大小写
                if infos_file:
                    datas = []
                    for info_file in infos_file:
                        datas.append({
                            'id':str(info_file.id),
                            'filename':info_file.filename,
                            'sharename':info_file.sharename,
                            'filesize':info_file.filesize,
                            'sharedate':info_file.sharedate,
                            'downloadcounte':info_file.downloadcounte,
                        })
                    return JsonResponse({'result': 1, 'data': datas})
                else:
                    return JsonResponse({'result': 0, 'data': '无数据'})
            else:
                infos_file = Sharing_file.objects.filter().all().order_by('-sharedate')
                # print infos_file
                if infos_file:
                    datas = []
                    for info_file in infos_file:
                        datas.append({
                            'id':str(info_file.id),
                            'filename':info_file.filename,
                            'sharename':info_file.sharename,
                            'filesize':info_file.filesize,
                            'sharedate':info_file.sharedate,
                            'downloadcounte':info_file.downloadcounte,
                        })
                    return JsonResponse({'result': 1, 'data': datas})
                else:
                    return JsonResponse({'result': 0, 'data': '无数据'})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')
#下载共享文件
@csrf_exempt
def download_share_file(request):
    try:
        data = json.loads(request.POST['data'])
        fileName = []
        for d in data['list']:
            info_file = Sharing_file.objects.get(id = d)
            if info_file:
                fileName.append(info_file.filename)
                info_file.downloadcounte = info_file.downloadcounte+1
                info_file.save()
            else:
                continue
        datas = {'url_b':'/static/uploads/soft_file/','filename':fileName}
        return JsonResponse({'result': 1, 'data': datas})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#分页查询
@csrf_exempt
def paging_query_file(request):
    try:
        data = json.loads(request.POST['data'])
        current_page = int(data['i'])
        keyword = data['keyword']
        #数据总条数除以每页条数记录得到页数,filename__icontains不区分大小写、包含
        page_num = math.ceil(Sharing_file.objects.filter(filename__icontains=data['keyword']).all().count()/16.0)
        #skip()跳过之前页的记录条数，再取出接下来的16条记录
        files_info = Sharing_file.objects.filter(filename__icontains=data['keyword']).all().order_by('-sharedate').skip((current_page-1)*16).limit(16)
        if files_info:
            datas = []
            for file_info in files_info:
                datas.append({
                    'id':str(file_info.id),
                    'filename':file_info.filename,
                    'sharename':file_info.sharename,
                    'filesize':file_info.filesize,
                    'sharedate':file_info.sharedate,
                    'downloadcounte':file_info.downloadcounte,
                })
            # print datas
            d = {"data":datas,'page_num':page_num,'current_page':int(data['i'])}
            return JsonResponse({'result': 1, 'data': d})
        else:
            return JsonResponse({'result': 2, 'data': '无数据'})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#生成分页，查询数据总数
@csrf_exempt
def produce_page(request):
    try:
        data = json.loads(request.POST['data'])
        keyword = data['keyword']
        count = Sharing_file.objects.filter(filename__icontains=data['keyword']).all().count()
        page_num = math.ceil(count/16.0)
        # print page_num
        return JsonResponse({'result': 1, 'count':count,'page_num': page_num})
        
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})

#生成分页,人员日报
@csrf_exempt
def produce_page_for_showAll(request):
    try:
        data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
        # print data
        starttime = data["starttime"]
        endtime = data["endtime"]
        province = data["province"]
        city = data["city"]
        contractno = data["contractno"]
        projectname = data["projectname"]
        clientname = data["clientname"]
        worktype = data["worktype"]
        workitem = data["workitem"]
        salename = data["salename"]
        department = data["department"]
        dutyname = data["dutyname"]
        membername = data["membername"]
        flags = data["flag"]
        list_i = []
        list_j = []
        if province != "":
            list_i.append("province")
            list_j.append(province)
        if city != "":
            list_i.append("city")
            list_j.append(city)
        if contractno != "":
            list_i.append("contractno")
            list_j.append(contractno)
        if projectname != "":
            list_i.append("projectname")
            list_j.append(projectname)
        if clientname != "":
            list_i.append("clientname")
            list_j.append(clientname)
        if worktype != "":
            list_i.append("worktype")
            list_j.append(worktype)
        if workitem != "":
            list_i.append("workitem")
            list_j.append(workitem)
        if salename != "":
            list_i.append("salename")
            list_j.append(salename)
        if department != "":
            list_i.append("department")
            list_j.append(department)
        if dutyname != "":
            list_i.append("dutyname")
            list_j.append(dutyname)
        if membername != "":
            list_i.append("membername")
            list_j.append(membername)
        dict_search = dict(zip(list_i,list_j))#转化为字典
        try:
            if request.session.get('is_login', None):
                #计算总人日，总人月，固定费用，变动费用
                code = '''
                    function(){
                        var monthtatol = 0;
                        var daytatol = 0;
                        var fixedcosttatol = 0;
                        var othercosttatol = 0;
                        db[collection].find(query).forEach(function(x){
                                var temp1 = Number(x.workload );
                                var temp2 = Number(x.workload )*Number(x.level );
                                var s = (x.othercost).split("u'");
                                  var t = "";
                                  for (var i =0 ; i < s.length ; i++){
                                      t =t + s[i]+ "'";
                                  }
                                  t = t.slice(0,-1);
                                var temp3 = eval(t);
                                var temp4 = 0 ;
                                for (var i = 0 ; i < temp3.length ; i++){
                                temp4 = temp4+ Number(temp3[i].fee);
                                }
                                othercosttatol = othercosttatol + temp4;
                                daytatol  = daytatol +temp1;
                                monthtatol  = monthtatol +temp2;
                        });
                        monthtatol = monthtatol / 21.75;
                        fixedcosttatol = monthtatol.toFixed(2) *12000;
                        return ([daytatol,monthtatol,fixedcosttatol,othercosttatol,query]);
                    }'''
                code_result = []
                if starttime != "" and endtime != "": 
                    count = Project.objects.filter(Q(workdate__gte = starttime)&Q(workdate__lte = endtime)&Q(flag__in = flags)).filter(**dict_search).all().count()
                    page_num = math.ceil(count/17.0)
                    code_result = Project.objects(Q(workdate__gte = starttime)&Q(workdate__lte = endtime)&Q(flag__in = flags)).filter(**dict_search).exec_js(code)
                if starttime != "" and endtime == "":
                    count = Project.objects.filter(Q(workdate = starttime)&Q(flag__in = flags)).filter(**dict_search).all().count()
                    page_num = math.ceil(count/17.0)
                    code_result = Project.objects(Q(workdate = starttime)&Q(flag__in = flags)).filter(**dict_search).exec_js(code)
                if starttime == "" and endtime != "":
                    count = Project.objects.filter(Q(workdate = endtime)&Q(flag__in = flags)).filter(**dict_search).all().count()
                    page_num = math.ceil(count/17.0)
                    code_result = Project.objects(Q(workdate = endtime)&Q(flag__in = flags)).filter(**dict_search).exec_js(code)
                if starttime == "" and endtime == "":
                    count = Project.objects.filter(Q(flag__in = flags)).filter(**dict_search).all().count()
                    page_num = math.ceil(count/17.0)
                    code_result = Project.objects(Q(flag__in = flags)).filter(**dict_search).exec_js(code)
                # print code_result
                return JsonResponse({'result': 1, 'count':count,'page_num': page_num, 'data':code_result})
            else:
                return render(request, 'login.html')
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    except Exception as e:
        print(e)
        return JsonResponse({'result': 0, 'data': ''})
#得到更新提示
@csrf_exempt
def get_update_tishi(request):
    if request.session.get('is_login', None):
        try:
            data = Update_tishi.objects.filter().order_by('-update_date').first()
            return JsonResponse({'result': 1, 'data': str(data.update_date)[0:10]+"："+data.update_content})
        except Exception as e:
            print(e)
            return JsonResponse({'result': 0, 'data': ''})
    else:
        return render(request, 'login.html')

# 删除某个文件
# @csrf_exempt
# def delete_file(request):
    # try:
        # data = json.loads(request.POST['data'])#将已编码的JSON字符串解码为Python对象
        # cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # path = cc + '/' + data['name']
        # print path
        # if path:
            # os.remove(path)#删除文件
            # return JsonResponse({'result': 1, 'data': ''})
        # else:
            # return JsonResponse({'result': 0, 'data': ''})
    # except Exception as e:
        # print (e)
        # return JsonResponse({'result': 0, 'data': ''})updata_change_equipment
