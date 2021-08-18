# -*- coding: utf-8 -*-
#每月一日凌晨02：00检查上月提交情况
def check_everymonth():
    import datetime
    if datetime.date.today().weekday() == 0:
        try:
            import time
            from controler.models import User,Project,Checkmonth
            from mongoengine.queryset.visitor import Q
            import dateutil.relativedelta
            import requests
            import json
            now_time = time.strftime('%Y.%m.%d %X',time.localtime(time.time()))#当前时间及一日02：00
            today = datetime.date.today() #当天日期
            first = today.replace(day=1)  #当月第一天
            lastMonthEnd = first - datetime.timedelta(days=1)  #上月最后一天
            lastMonthFirst = first + dateutil.relativedelta.relativedelta(months=-1)  #上月第一天
            lastMonthDaysList = (get_date_list(lastMonthFirst, lastMonthEnd))
            string = ''
            for i in lastMonthDaysList:
                string = string + i +','
            # 节假日接口(工作日对应结果为 0, 休息日对应结果为 1, 节假日对应的结果为 2 )
            url = 'http://tool.bitefu.net/jiari/?d='+string
            req = requests.get(url)
            data = json.loads(req.text)
            print now_time + "开始检测提交记录条数"
            data_user = []
            try:
                users = User.objects.filter(Q(user_role = "3")&Q(status = "在职")&Q(man_type = "2")).all()
                if users:
                    for user in users:
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
                    projects_count = Project.objects.filter(Q(membername = i["firstname"])&Q(workdate__gte = lastMonthDaysList[-1])&Q(workdate__lte = lastMonthDaysList[0])).count()
                    data_no_up = []
                    for key in data:
                        if str(data[key]) == '0':
                            projects_info = Project.objects.filter(Q(membername = i["firstname"])&Q(workdate = key)).all()
                            if projects_info:
                                continue
                            else:
                                data_no_up.append(str(key)[6:8])
                    if len(data_no_up):
                        data_no_up.sort(reverse=False)  #升序排序
                        checkmonth = Checkmonth(
                            checkdate = now_time,
                            username = i["username"],
                            real_name = i["firstname"],
                            count = str(projects_count),
                            checkresult = str(data_no_up)+"日",
                        )
                        checkmonth.save()
                    else:
                        checkmonth = Checkmonth(
                            checkdate = now_time,
                            username = i["username"],
                            real_name = i["firstname"],
                            count = str(projects_count),
                            checkresult = "正常提交",
                        )
                        checkmonth.save()
            else:
                print("无用户！")
            print "提交记录条数检测结束..."
        except Exception as e:
            print(now_time)
            print("error")
            print(e)
def gen_dates(b_date, days):
    from datetime import timedelta
    """
    :param b_date: 开始日期
    :param days: 天数
    :return:
    """
    day = timedelta(days=1)
    for i in range(days):
        yield b_date + day*i
def get_date_list(start_date, end_date):   #end_date=None
    """
    获取日期列表
    :param start: 开始日期
    :param end: 结束日期
    :return:
    """
    if start_date is not None:
        start = start_date
    if end_date is None:
        end = datetime.datetime.now()
    else:
        end = end_date
    data = []
    for d in gen_dates(start, ((end-start).days + 1)):    # 29 + 1
        data.append(d.strftime("%Y-%m-%d"))
    return data
# if __name__ == '__main__':
    # check_everymonth()