const axios = require('axios');
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMnBhMWExMjYxQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3NTM4NTc5ODUsImlhdCI6MTc1Mzg1NzA4NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjliNTE5ZWYyLTQ3MDktNDA2Yi05OTE5LWQwYjdhNzNjMGMwMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImthbGlkaW5kaSBuYWdhIHN1cnlhIHVtYSBzaXZhIHJhbWEgcmFqdSIsInN1YiI6ImE5MDdmZDVkLTQ5M2ItNDZkMS04MmU3LTg1Yzc1ODNhMGIyYiJ9LCJlbWFpbCI6IjIycGExYTEyNjFAdmlzaG51LmVkdS5pbiIsIm5hbWUiOiJrYWxpZGluZGkgbmFnYSBzdXJ5YSB1bWEgc2l2YSByYW1hIHJhanUiLCJyb2xsTm8iOiIyMnBhMWExMjYxIiwiYWNjZXNzQ29kZSI6InF4Uk13cSIsImNsaWVudElEIjoiYTkwN2ZkNWQtNDkzYi00NmQxLTgyZTctODVjNzU4M2EwYjJiIiwiY2xpZW50U2VjcmV0IjoiUHpLTmJGWWdTWFBjUERjWCJ9.2M6NWiPC1vUqc6La5VTh1pUpUY6SorHWq6NxOYyi2kA"
async function logRequest(stack,level,package,message) {
    try {
        const response = await axios.post('http://20.244.56.144/evaluation-service/logs',{
            stack: stack,
            level: level,
            package: package,
            message: message
        },{ 
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
        }});
        console.log('log id : ', response.data.logId);
        console.log('log message : ', response.data.message);
}
catch (error) {
        console.error('Error logging request:', error);
    }
}
module.exports = logRequest;