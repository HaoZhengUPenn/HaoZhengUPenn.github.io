#conding=utf8  
import os
path = "C:/Users/Platina/Documents/GitHub/HaoZhengUPenn.github.io" #文件夹目录
files= os.listdir(path) #得到文件夹下的所有文件名称

s = []
for file in files: #遍历文件夹
    if not os.path.isdir(file): #判断是否是文件夹，不是文件夹才打开
        if file[-4:]=="html":
            f = open(path+"/"+file); #打开文件
            iter_f = iter(f); #创建迭代器
            str1 = ""
            for line in iter_f: #遍历文件，一行行遍历，读取文本
                str1 = str1 + line
            str1 = str1.replace("2019-2022", "2015-2023")
            f.close()
            with open(path+"/"+file,'w') as f:    #设置文件对象
                f.write(str1)