# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# from django.db import models 
import mongoengine
import time

# Create your models here.
#用户表
class User(mongoengine.Document):
    username = mongoengine.StringField(max_length=100)
    real_name = mongoengine.StringField(max_length=100)
    password = mongoengine.StringField(max_length=100)
    user_role = mongoengine.StringField(max_length=100)
    man_type = mongoengine.StringField(max_length=100)#管理类1，执行类2，用于后续检查周报提交情况排除不用提交的用户
    position = mongoengine.StringField(max_length=100)
    level = mongoengine.StringField(max_length=100)
    status = mongoengine.StringField(max_length=100)
    class Meta:
        db_table = "user_info"

#项目表
class Project(mongoengine.Document):
    contractno = mongoengine.StringField(max_length=100)
    projectname = mongoengine.StringField(max_length=100)
    clientname = mongoengine.StringField(max_length=100)
    dutyname = mongoengine.StringField(max_length=100) #销售名称
    salename = mongoengine.StringField(max_length=100) #销售名称
    department = mongoengine.StringField(max_length=100)
    workdate = mongoengine.DateTimeField(default=time.strftime('%Y-%m-%d'))
    endtime = mongoengine.DateTimeField(default=time.strftime('%Y-%m-%d'))
    province = mongoengine.StringField(max_length=100)
    city = mongoengine.StringField(max_length=100)
    county = mongoengine.StringField(max_length=100)
    workload = mongoengine.StringField(max_length=100) #工程量
    othercost = mongoengine.StringField() #变动费用
    fixedcost = mongoengine.StringField(max_length=100)  #固定费用
    worktype = mongoengine.StringField(max_length=100)
    workitem = mongoengine.StringField(max_length=100)
    workcontent = mongoengine.StringField()
    toresult = mongoengine.StringField() #输出结果
    membername = mongoengine.StringField(max_length=100)
    memberid = mongoengine.StringField(max_length=100)
    request = mongoengine.StringField()
    level = mongoengine.StringField(max_length=100)
    remark = mongoengine.StringField()#备注
    flag = mongoengine.StringField(max_length=2)#标记未读
    returnreasons = mongoengine.StringField(max_length=100)#退回原因
    state_flag = mongoengine.StringField(max_length=2)#标记实施项目此时的状态S1为实施状态及“进行中”状态，S0为保修阶段的状态及非“进行中”状态
    class Meta:
        db_table = "project_info"

class work(mongoengine.Document):
    xuhao = mongoengine.IntField(required=True)
    clientname = mongoengine.StringField(max_length=100)
    contractno = mongoengine.StringField(max_length=100)
    type = mongoengine.StringField(max_length=20)
    projectname = mongoengine.StringField(max_length=100)
    cont_status = mongoengine.StringField(max_length=5,default='Null')
    cont_name = mongoengine.StringField()
    money = mongoengine.StringField(max_length=20) 
    state = mongoengine.StringField(max_length=10)
    caigouzhuangtai = mongoengine.StringField(max_length=20)
    arrival_status = mongoengine.StringField(max_length=20) #到货状态
    shishiqingkuang = mongoengine.StringField(max_length=20)
    guidangqingkuang = mongoengine.StringField(max_length=20)
    huowuqingdian = mongoengine.StringField(max_length=20)
    chuyanbaogao = mongoengine.StringField(max_length=20)
    zhongyanbaogao = mongoengine.StringField(max_length=20)
    dutyname = mongoengine.StringField(max_length=100)
    salename = mongoengine.StringField(max_length=100) #销售名称
    hetongqixian = mongoengine.StringField(max_length=100) #合同期限
    yikaipiao = mongoengine.StringField(max_length=10)
    yishoukuan = mongoengine.StringField(max_length=10)
    remark = mongoengine.StringField(max_length=200)
    latestupdate = mongoengine.DateTimeField(default=time.strftime('%Y-%m-%d %H:%M:%S'))#最近更新时间，默认为当前时间
    department = mongoengine.StringField(max_length=100)
    latestupdatecontent = mongoengine.StringField(max_length=100)
    class Meta:
        db_table = "work"

class Sale(mongoengine.Document):
    salename = mongoengine.StringField(max_length=100) #销售名称
    telnum = mongoengine.StringField(max_length=100) #电话号码
    emailaddr =mongoengine.StringField(max_length=100) #邮箱地址
    class Meta:
        db_table = "sale"

class Duty(mongoengine.Document):
    dutyname = mongoengine.StringField(max_length=100)#客户表
    class Meta:
        db_table = "duty"

class Worktype(mongoengine.Document):
    worktype = mongoengine.StringField(max_length=100)#工作类
    workitem = mongoengine.StringField(max_length=100)#工作项
    class Meta:
        db_table = "worktype"

class Check(mongoengine.Document):
    checkdate =  mongoengine.DateTimeField(default=time.strftime('%Y-%m-%d'))#检查日期
    username = mongoengine.StringField(max_length=100)#被检测者姓名
    real_name = mongoengine.StringField(max_length=100)
    count = mongoengine.StringField(max_length=10)
    checkresult = mongoengine.StringField(max_length=100)#检测结果
    class Meta:
        db_table = "check"

class Checkmonth(mongoengine.Document):
    checkdate =  mongoengine.DateTimeField(default=time.strftime('%Y-%m-%d'))#检查日期
    username = mongoengine.StringField(max_length=100)#被检测者姓名
    real_name = mongoengine.StringField(max_length=100)
    count = mongoengine.StringField(max_length=10)
    checkresult = mongoengine.StringField()#检测结果
    class Meta:
        db_table = "checkmonth"

class Updatecontent(mongoengine.Document):
    contractno = mongoengine.StringField(max_length=100)
    content = mongoengine.StringField()
    class Meta:
        db_table = "updatecontent"

class Pro_update(mongoengine.Document):
    username = mongoengine.StringField(max_length=10)
    serial_number = mongoengine.StringField(max_length=21)
    pro_update_order = mongoengine.IntField(required=True)
    contractno = mongoengine.StringField(max_length=100)
    projectname = mongoengine.StringField(max_length=100)
    archiving_situation = mongoengine.StringField(max_length=10)
    cargo_inventory = mongoengine.StringField(max_length=20)
    preliminary_report = mongoengine.StringField(max_length=20)
    final_report = mongoengine.StringField(max_length=20)
    invoiced = mongoengine.StringField(max_length=10)
    receivable = mongoengine.StringField(max_length=10)
    class Meta:
        db_table = "pro_update"
        
class Pro_report(mongoengine.Document):
    username = mongoengine.StringField(max_length=10)
    serial_number = mongoengine.StringField(max_length=21)
    pro_report_order = mongoengine.IntField(required=True)
    contractno = mongoengine.StringField(max_length=100)
    projectname = mongoengine.StringField(max_length=100)
    last_week_trends = mongoengine.StringField()
    next_week_plan = mongoengine.StringField()
    class Meta:
        db_table = "pro_report"
    
class Archive(mongoengine.Document):
    sequen_num = mongoengine.IntField(required=True)#序号
    contractno = mongoengine.StringField(max_length=100)#合同编号
    projectname = mongoengine.StringField(max_length=100)#项目名称
    docum_type = mongoengine.StringField(max_length=100)#报告类
    docum_item = mongoengine.StringField(max_length=100)#报告项
    docum_intro = mongoengine.StringField(max_length=200)#报告说明
    docum_sign = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#报告签署日期
    docum_regis = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#报告初次登记日期
    docum_regis_latest = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#报告最新修改日期
    submit_name =  mongoengine.StringField(max_length=100)#提交人
    regis_name =  mongoengine.StringField(max_length=100)#登记人
    other_intro =  mongoengine.StringField(max_length=200)#备注
    docum_file_id =  mongoengine.StringField()#该记录对应的文件id
    class Meta:
        db_table = "archive"

class Equip_prod(mongoengine.Document):
    brand = mongoengine.StringField(max_length=15)#品牌
    type = mongoengine.StringField(max_length=15)#类型
    model = mongoengine.StringField(max_length=30)#型号
    class Meta:
        db_table = "equip_prod"

class Equip_regist(mongoengine.Document):
    contractno = mongoengine.StringField(max_length=100)#合同编号
    projectname = mongoengine.StringField(max_length=100)#项目名称
    dutyname = mongoengine.StringField(max_length=100)#项目负责人
    regis_name = mongoengine.StringField(max_length=100)#登记人
    equip_regis = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#初次登记日期
    equip_regis_latest = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#最后修改日期
    remake =  mongoengine.StringField(max_length=200)#备注
    count =  mongoengine.IntField(required=True)#总共多少条设备记录
    class Meta:
        db_table = "equip_regist"

class Equip_regist_prod(mongoengine.Document):
    contractno = mongoengine.StringField(max_length=100)#合同编号
    brand = mongoengine.StringField(max_length=15)#品牌
    type = mongoengine.StringField(max_length=15)#类型
    model = mongoengine.StringField(max_length=30)#型号
    number = mongoengine.IntField(required=True)#设备数量
    serial = mongoengine.StringField(max_length=30)#设备序列号
    rank = mongoengine.IntField(required=True)#记录序号，记录该条记录为对应项目的第几个设备
    warranty_start_date = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#维保开始日期
    warranty_end_date = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#维保终止日期
    remake =  mongoengine.StringField(max_length=200)#备注
    class Meta:
        db_table = "equip_regist_prod"

#实施：implementation
#保修：guarantee
class Personnel_input(mongoengine.Document):
    contractno = mongoengine.StringField(max_length=100)#合同编号
    imp_primary = mongoengine.StringField(max_length=4)#初级
    imp_primary_add = mongoengine.StringField(max_length=5)#初级
    imp_intermediate = mongoengine.StringField(max_length=4)#中级
    imp_intermediate_add = mongoengine.StringField(max_length=5)#中级
    imp_senior = mongoengine.StringField(max_length=4)#高级
    imp_senior_add = mongoengine.StringField(max_length=5)#高级
    imp_senior_plus = mongoengine.StringField(max_length=4)#高级+
    imp_senior_plus_add = mongoengine.StringField(max_length=5)#高级+
    imp_other = mongoengine.StringField(max_length=4)#其他
    imp_other_add = mongoengine.StringField(max_length=5)#其他
    gua_primary = mongoengine.StringField(max_length=4)#初级
    gua_primary_add = mongoengine.StringField(max_length=5)#初级
    gua_intermediate = mongoengine.StringField(max_length=4)#中级
    gua_intermediate_add = mongoengine.StringField(max_length=5)#中级
    gua_senior = mongoengine.StringField(max_length=4)#高级
    gua_senior_add = mongoengine.StringField(max_length=5)#高级
    gua_senior_plus = mongoengine.StringField(max_length=4)#高级+
    gua_senior_plus_add = mongoengine.StringField(max_length=5)#高级+
    gua_other = mongoengine.StringField(max_length=4)#其他
    gua_other_add = mongoengine.StringField(max_length=5)#其他
    remake = mongoengine.StringField(max_length=100)#备注
    add_date = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#添加日期
    update_date = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#最近修改日期
    class Meta:
        db_table = "personnel_input"

class Sharing_file(mongoengine.Document):
    filename = mongoengine.StringField(max_length=200)#文件名
    sharename = mongoengine.StringField(max_length=15)#分享人
    filesize = mongoengine.StringField(max_length=15)#文件大小
    sharedate = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#发布日期
    downloadcounte = mongoengine.IntField(required=True)#下载次数
    class Meta:
        db_table = "sharing_file"
        
class Update_tishi(mongoengine.Document):
    update_date = mongoengine.DateTimeField(default=time.strftime('%Y/%m/%d'))#更新日期
    update_content = mongoengine.StringField()#备注
    class Meta:
        db_table = "update_tishi"
        