# -*- coding: utf-8 -*-
def change_InvoicedAndReceivable():
    import time
    from controler.models import work,Updatecontent
    # from mongoengine.queryset.visitor import Q
    # import mongoengine
    import os
    import sys
    reload(sys)
    sys.setdefaultencoding('utf8')
    now_time = time.strftime('%Y%m%d %X',time.localtime(time.time()))#当前日期时间
    print ("##############%s更新收款和开票记录开始#################" %now_time)
    cc = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = cc + '/static/uploads/jcssbFileData/' #用于检测更新的文件位置
    file_name = file_path + 'jcssbFileData_' + now_time[0:8]
    if os.path.exists(file_name):
        file = open(file_name,'r')
        try:
            text = file.readline()#先读取第一行的标题，让后面的从第二行开始
            while True:
                text = file.readline() #读取一行内容
                if text:
                    line_list = text.strip('\n').split('\t')
                    #获取已开票和已收款的小数形式，不带四舍五入的。
                    # invoiced = str(float(line_list[1])/100).split('.')[0] + '.' + str(float(line_list[1])/100).split('.')[1][:2]
                    # receivable = str(float(line_list[2])/100).split('.')[0] + '.' + str(float(line_list[2])/100).split('.')[1][:2]
                    invoiced = str(float('%.2f'%(float(line_list[1])/100)))
                    if len(invoiced)!=4:
                        invoiced = invoiced + '0'
                    receivable = str(float('%.2f'%(float(line_list[2])/100)))
                    if len(receivable)!=4:
                        receivable = receivable + '0'
                    try:
                        updatecontent = ''
                        work_info = work.objects.get( contractno = line_list[0])
                        if work_info:
                            content_info = Updatecontent.objects.filter(contractno=line_list[0]).first()#更新的Updatecontent表
                            if work_info.yikaipiao != invoiced:
                                print ("%s：已开票从%s修改为%s" %(line_list[0],work_info.yikaipiao,invoiced))
                                updatecontent=updatecontent+"将已开票从"+work_info.yikaipiao+"修改为"+invoiced
                                work_info.yikaipiao = invoiced
                            else:
                                 print ("%s：已开票未改动"%line_list[0])
                            if work_info.yishoukuan  != receivable:
                                print ("%s：已收款从%s修改为%s" %(line_list[0],work_info.yishoukuan,receivable))
                                updatecontent=updatecontent+"将已收款从"+work_info.yishoukuan+"修改为"+receivable
                                work_info.yishoukuan = receivable
                            else:
                                print("%s：已收款未改动"%line_list[0])
                            if updatecontent:
                                work_info.latestupdatecontent = "脚本"+updatecontent 
                                work_info.latestupdate = time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time()))
                            time2 = str(time.strftime('%Y.%m.%d %H:%M:%S',time.localtime(time.time())))
                            if content_info:
                                content_info.content = content_info.content+'；'+ time2 + '，脚本' + updatecontent
                            else:
                                content_info = Updatecontent(
                                    contractno = line_list[0],
                                    content = time2 + '，脚本' + updatecontent
                                )
                            content_info.save()
                            work_info.save()
                        else:
                            print "未找到项目"+work_info
                    except Exception as e:
                        print(e)
                else:
                    print "**********文本遍历结束**********"
                    break
        finally:
            file.close()
            print "close file"
    else: 
        print "未找到当天更新所需文本文件"
    print ("##############%s更新收款和开票记录结束#################" %(time.strftime('%Y%m%d %X',time.localtime(time.time()))) )
