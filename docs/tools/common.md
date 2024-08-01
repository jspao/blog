# 日常笔记

## MacOS 相关

- 查当前机器IP

```sh
ipconfig getifaddr en0
```

- 查端口占用及kill
```sh
# 查端口
sudo lsof -i:8300
# kill
sudo kill -9 PID
```

- Mac 代码 Windows 增加 ._ 文件剔除方式

git bash 进入指定工程，然后执行命令 `find . -name "._*"|xargs rm`

- Mac 修改 hosts 配置
  -  `sudo vi /etc/hosts`
  -  输入本机密码后，打开hosts文件，键盘输入 i （插入），修改hosts文件后，按 esc 键退出,再按shift+：键，再输入w和q，保存退出
  -  不保存退出，则按q和！键