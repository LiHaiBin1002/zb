# -*- coding: utf-8 -*-
# 周一01：00检查上周的提交情况
def check():
    try:
        import time
        from controler.models import User,Project,Check,work
        from mongoengine.queryset.visitor import Q
        import mongoengine
        import datetime
        import requests
        import os
        import json
        import sys
        reload(sys)
        sys.setdefaultencoding('utf8')
        now_time = time.strftime('%Y.%m.%d %X',time.localtime(time.time()))#当前时间及周一01：00
        print now_time
        last_week_date = []
        now = datetime.datetime.now()
        print now
        string = ''
        for i in range(1,8):
            # 上周七天的日期
            date = str(now - datetime.timedelta(days=now.weekday()+i))[0:10]
            string = string + date+','
            last_week_date.append(date)
        # 节假日接口(工作日对应结果为 0, 休息日对应结果为 1, 节假日对应的结果为 2 )
        print string
        url = 'http://tool.bitefu.net/jiari/?d='+string
        print url
        req = requests.get(url)
        print req
        data = json.loads(req.text)
        print data
        print now_time
        print "开始检测提交记录条数"
        data_user = []
        try:
            users = User.objects.filter(Q(user_role = "3")&Q(status = "在职")&Q(man_type = "2")).all()
            if users:
                for user in users:
                   if user.username != "fujunhuan":
                        data_user.append({
                            "id": str(user.id),
                            "username":user.username,
                            'firstname': user.real_name,
                        })
            else:
                data_user = []
        except Exception as e:
            print(now_time+"用户查询失败！")
        if len(data_user):
            for i in data_user:
                projects_count = Project.objects.filter(Q(membername = i["firstname"])&Q(workdate__gte = last_week_date[6])&Q(workdate__lte = last_week_date[0])).count()
                data_no_up = []
                for key in data:
                    if str(data[key]) == '0':
                        projects_info = Project.objects.filter(Q(membername = i["firstname"])&Q(workdate = key)).all()
                        if projects_info:
                            continue
                        else:
                            data_no_up.append(str(key)[6:8])
                if len(data_no_up):
                    check = Check(
                        checkdate = now_time,
                        username = i["username"],
                        real_name = i["firstname"],
                        count = str(projects_count),
                        checkresult = str(data_no_up)+"日",
                    )
                    check.save()
                else:
                    check = Check(
                        checkdate = now_time,
                        username = i["username"],
                        real_name = i["firstname"],
                        count = str(projects_count),
                        checkresult = "正常提交",
                    )
                    check.save()
        else:
            print("无用户！")
        print "提交记录条数检测结束..."
    except Exception as e:
        print("error")
        print(e)
    # print "开始检查项目进度..."
    # try:
        # works_info = work.objects.filter(Q(caigouzhuangtai__gte = "完成采购")&(Q(yikaipiao__gte = "1.00")|Q(yikaipiao__gte = "1.0")|Q(yikaipiao__gte = "1"))).all()
        # # print works_info
        # if works_info:
            # for work_info in works_info:
                # if (work_info.type == '1-系统集成' or work_info.type == '2-网络集成'):
                    # if ((work_info.guidangqingkuang == '1.0' or work_info.guidangqingkuang == '1.00' or work_info.guidangqingkuang == '1') and work_info.shishiqingkuang == '已完成实施'):
                        # if (work_info.state != '已结项'):
                            # work_info.state = '已结项'
                            # print "已将第"+str(work_info.xuhao)+"项目的‘项目状态’改为‘已结项’"
                    # elif (work_info.guidangqingkuang == '1.0' or work_info.guidangqingkuang == '1.00' or work_info.guidangqingkuang == '1'):
                        # if (work_info.state != '已归档'):
                            # work_info.state = '已归档'
                            # print "已将第"+str(work_info.xuhao)+"项目的‘项目状态’改为‘已归档’"
                # elif (work_info.type == '3-仅供货' or work_info.type == '5-服务外包'):
                    # if (work_info.yishoukuan == '1.0' or work_info.yishoukuan == '1.00' or work_info.yishoukuan == '1'):
                        # if (work_info.state != '已关闭'):
                            # work_info.state = '已关闭'
                            # print "已将第"+str(work_info.xuhao)+"项目的‘项目状态’改为‘已关闭’"
                # elif work_info.type == '4-维保服务':
                    # if work_info.shishiqingkuang == '已完成实施':
                        # if (work_info.state != '已结项'):
                            # work_info.state = '已结项'
                            # print "已将第"+str(work_info.xuhao)+"项目的‘项目状态’改为‘已结项’"
                    # elif (work_info.yishoukuan == '1.0' or work_info.yishoukuan == '1.00' or work_info.yishoukuan == '1'):
                        # if (work_info.state != '已关闭'):
                            # work_info.state = '已关闭'
                            # print "已将第"+str(work_info.xuhao)+"项目的‘项目状态’改为‘已关闭’"
                # else:
                    # print '无此项目类型'
                # work_info.save()
    # except Exception as e:
        # print e
        # print(now_time+"进度查询失败！")
    # print "项目进度检测结束..."
    print "####################################################"