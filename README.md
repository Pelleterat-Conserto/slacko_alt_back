## 👨🏻‍💻 Docker usage

Build image with tag <your-tag>:
`docker build . -t your-tag`

Check images:
`docker images`

Run the app on port <3001>
`docker run -p 3001:3000 -d your-tag`
The first 3000 is the port in the app. The number 3001 will be output port.

You can check that the application run properly, using this cURL (on port 3001):
```
curl 'http://localhost:3001/getChannels' \
  -H 'Accept: */*' \
  -H 'Accept-Language: fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Origin: http://localhost:3001' \
  -H 'Pragma: no-cache' \
  -H 'Referer: http://localhost:3001/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --compressed
```

You should have the response:
`{"channels":[{"name":"General","participants":0,"id":1,"sockets":[]},{"name":"H.S.","participants":0,"id":2,"sockets":[]}]}`