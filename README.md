# Uptime Nuxt

<a target="_blank" href="https://github.com/misaon/uptime-nuxt"><img src="https://img.shields.io/github/stars/misaon/uptime-nuxt" /></a> <a target="_blank" href="https://hub.docker.com/r/misaon/uptime-nuxt"><img src="https://img.shields.io/docker/pulls/misaon/uptime-nuxt" /></a> <a target="_blank" href="https://hub.docker.com/r/misaon/uptime-nuxt"><img src="https://img.shields.io/docker/v/misaon/uptime-nuxt/latest?label=docker%20image%20ver." /></a> <a target="_blank" href="https://github.com/misaon/uptime-nuxt"><img src="https://img.shields.io/github/last-commit/misaon/uptime-nuxt" /></a>

<br />
<div align="center" width="100%">
    <img src="./assets/images/uptime-nuxt.png" width="200" alt="logo" />
</div>
<br />

A fast, minimalistic, and powerful self-hosted monitoring tool built on modern technologies.

> 🚧 This project is in the development phase, new features will be added continuously.

---

## 🔧 How to Install

### 🐳 Docker

```bash
docker run -p 80:80 -v uptime-nuxt:/app/server/data misaon/uptime-nuxt:latest
```

Browse to http://localhost:80 after starting.

---

## Motivation
I've always wanted to create a monitoring tool. The last impetus for starting this project was my dissatisfaction with the stability and functionality of the [uptime-kuma](https://github.com/louislam/uptime-kuma) tool and the unmaintained [statiping](https://github.com/statping/statping). 
I wanted to make the most of the potential of the new Vue framework Nuxt 3, which also has support for the server layer. 
So that makes it a powerful tool for creating full-stack applications. **I have big plans for the project**, 
new features and technologies will be added. I will be happy if my idea of a completely robust and functional 
monitoring tool will be shared by the community.

💚 Many thanks to the [Nuxt team](https://nuxtjs.org/teams/) for their great work and support.
