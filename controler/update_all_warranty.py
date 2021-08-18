# -*- coding: utf-8 -*-
def update_warranty_cont():
    import check_warranty
    from models import Equip_regist_prod,Equip_regist
    import mongoengine
    import time
    try:
        equips_info = Equip_regist_prod.objects.filter()
        print equips_info
        if equips_info:
            for equip_info in equips_info:
                print equip_info.serial
                list = [equip_info.contractno,equip_info.brand,equip_info.type,equip_info.model,equip_info.number,equip_info.serial,str(equip_info.id)]
                slist = check_warranty.check(list)
                if slist[7] != '0/0/0' and  slist[8] != '0/0/0':
                    start = slist[7][0:4]+'-'+slist[7][5:7]+'-'+slist[7][8:10]
                    end = slist[8][0:4]+'-'+slist[8][5:7]+'-'+slist[8][8:10]
                    if start != str(equip_info.warranty_start_date)[0:10] or end != str(equip_info.warranty_end_date)[0:10]:
                        info = Equip_regist_prod.objects.get(id=equip_info.id)
                        if info:
                            info.warranty_start_date = start
                            info.warranty_end_date = end
                            info.save()
                            info1 = Equip_regist.objects.get(contractno=equip_info.contractno)
                            if info1:
                                info1.equip_regis_latest = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
                                info1.save()
                                print 'update success'
                    else:
                        print 'update fail'
                        continue
                else:
                    continue
            print 1
        else:
            print 2
    except Exception as e:
        print (e)
        print 0
