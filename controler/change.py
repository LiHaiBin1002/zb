# -*- coding: utf-8 -*-
def change():
    import time
    from controler.models import Project,work
    from mongoengine.queryset.visitor import Q
    import mongoengine
    import os
    import json
    now_time = time.strftime('%Y.%m.%d %X',time.localtime(time.time()))#��ǰʱ��
    print now_time
    print "��ʼ���"
    try:
        projects = Project.objects.all()
        works = work.objects.all()
        for work in works:
            for  project in projects:
                if project.contractno == work.contractno:
                    if project.clientname != work.clientname:
                        print  "�ܱ�%s�Ŀͻ����ƴ�%s�޸�Ϊ%s"%(str(project.id),(project.clientname).encode("utf-8"),(work.clientname).encode("utf-8"))
                        project.clientname  = work.clientname
                        project.save()
                        print '�ɹ�'
    except Exception as e:
        print('ERROR!')
        print(e)
    print "������"
    print "########################################"
    