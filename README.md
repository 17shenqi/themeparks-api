# Themeparks Api

基于 [Themeparks](https://github.com/cubehouse/themeparks) 封装的乐园等候时间查询 Api

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/themeparks-api" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/themeparks-api" alt="Package License" /></a>

## 主要特性：

- TypeScript
- 按地区读取，查询更便捷
- 增加乐园缩写代码，更利于存储
- 统一的游乐设施标识

## 乐园地区代码：

| 位置             | 代码  |
| :--------------- | :---- |
| 加州迪士尼       | cadp  |
| 奥兰多迪士尼世界 | fldw  |
| 香港迪士尼       | hkdl  |
| 上海迪士尼       | shdr  |
| 东京迪士尼       | tkydl |

## 开始
npm i themeparks-Api

```javascript
import * as ThemeParksApi from 'themeparks-api'

// 获取等候时间
ThemeParksApi[LocationCode].getWaitTimes()

// 获取时间表
ThemeParksApi[LocationCode].getSchedules()

// 获取今日时间表
ThemeParksApi[LocationCode].getTodaySchedules()
```

## 使用的网站和应用

- 小程序：魔法等候时间
- 小程序：神奇等候时间
- 小程序：乐园等候时间
- 小程序：乐园日记