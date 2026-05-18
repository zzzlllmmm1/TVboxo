# coding=utf-8
# !/usr/bin/python

"""

作者 丢丢喵 内容均从互联网收集而来 仅供交流学习使用 严禁用于商业用途 请于24小时内删除
         ====================Diudiumiao====================

"""

from Crypto.Util.Padding import unpad
from Crypto.Util.Padding import pad
from urllib.parse import unquote
from Crypto.Cipher import ARC4
from urllib.parse import quote
from base.spider import Spider
from Crypto.Cipher import AES
from datetime import datetime
from bs4 import BeautifulSoup
from base64 import b64decode
import urllib.request
import urllib.parse
import datetime
import binascii
import requests
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

xurl = "https://iys.cc"

headerx = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
          }

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://iys.cc/',
    'sec-ch-ua': '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',
           }

class Spider(Spider):

    def getName(self):
        return "丢丢喵"

    def init(self, extend):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def homeVideoContent(self):
        pass

    def decode_magic_string(self, encoded_str):
        def extract_b64_content(encoded_str):
            if "_" in encoded_str:
                parts = encoded_str.split('_')
                if parts[0] == 'enc' and len(parts) >= 2:
                    return parts[1]
            return encoded_str

        def add_padding(b64_content):
            missing_padding = len(b64_content) % 4
            if missing_padding:
                b64_content += '=' * (4 - missing_padding)
            return b64_content

        def decode_base64(b64_content):
            url_encoded_bytes = base64.b64decode(b64_content)
            return url_encoded_bytes.decode('utf-8')

        def decode_url_encoding(url_encoded_str):
            return urllib.parse.unquote(url_encoded_str)

        def parse_json(json_str):
            try:
                return json.loads(json_str)
            except json.JSONDecodeError:
                return json_str

        def decode_process(encoded_str):
            b64_content = extract_b64_content(encoded_str)
            padded_content = add_padding(b64_content)
            decoded_str = decode_base64(padded_content)
            unquoted_str = decode_url_encoding(decoded_str)
            return parse_json(unquoted_str)
        try:
            return decode_process(encoded_str)
        except Exception as e:
            return f"解码失败: {str(e)}"

    def homeContent(self, filter):
        def get_detail_data():
            detail = requests.get(f'{xurl}/api/info', headers=headers)
            detail.encoding = "utf-8"
            res5 = detail.text.replace('"', '')
            return self.decode_magic_string(res5)

        def extract_raw_class_line(source_str):
            if not source_str or not isinstance(source_str, str):
                return ""
            if '\n' in source_str:
                return source_str.split('\n')[-1]
            return source_str

        def parse_categories(source_str):
            categories = []
            raw_class_line = extract_raw_class_line(source_str)
            if not raw_class_line:
                return categories
            items = raw_class_line.split('|')
            for item in items:
                if ',' in item:
                    parts = item.strip().split(',')
                    if len(parts) == 2:
                        categories.append({
                            "type_id": parts[1].strip(),
                            "type_name": parts[0].strip()
                                         })
            return categories

        def add_unique_categories(all_classes, seen_ids, new_categories):
            for cat in new_categories:
                if cat['type_id'] not in seen_ids:
                    all_classes.append(cat)
                    seen_ids.add(cat['type_id'])
            return all_classes, seen_ids

        def process_data_json(data_json):
            all_classes = []
            seen_ids = set()
            if isinstance(data_json, dict) and 'data' in data_json:
                raw_data = data_json['data']
                if 'hot_db' in raw_data:
                    categories = parse_categories(raw_data['hot_db'])
                    all_classes, seen_ids = add_unique_categories(all_classes, seen_ids, categories)
                if 'short' in raw_data:
                    categories = parse_categories(raw_data['short'])
                    all_classes, seen_ids = add_unique_categories(all_classes, seen_ids, categories)
            return all_classes
        result = {"class": []}
        data_json = get_detail_data()
        all_classes = process_data_json(data_json)
        result['class'] = all_classes
        return result

    def categoryContent(self, cid, pg, filter, ext):
        def get_page_number(pg):
            return int(pg) if pg else 1

        def build_request_data(cid, page):
            return {
                'type': cid,
                'page': page,
                'api_url': 'https://bf.xoxowin86cisyap.com/api.php/provide/vod/',
                   }

        def fetch_category_data(cid, page):
            json_data = build_request_data(cid, page)
            detail = requests.post(f'{xurl}/api/hot', headers=headers, json=json_data)
            detail.encoding = "utf-8"
            return detail.json()

        def create_video_item(vod):
            return {
                "vod_id": vod['id'],
                "vod_name": vod['title'],
                "vod_pic": vod['cover'],
                "vod_remarks": vod.get('vod_remarks', '暂无备注')
                   }

        def process_video_list(data):
            videos = []
            for vod in data['data']:
                video_item = create_video_item(vod)
                videos.append(video_item)
            return videos

        def build_result(videos, pg):
            return {
                'list': videos,
                'page': pg,
                'pagecount': 9999,
                'limit': 90,
                'total': 999999
                   }
        page = get_page_number(pg)
        data = fetch_category_data(cid, page)
        videos = process_video_list(data)
        return build_result(videos, pg)

    def detailContent(self, ids):
        def get_video_id(ids):
            return ids[0] if ids else ""

        def build_request_data(did):
            return {
                'api': 'https://bf.xoxowin86cisyap.com/api.php/provide/vod/',
                'ids': did
                   }

        def fetch_detail_with_retry(json_data, max_retries=100):
            retry_count = 0
            while retry_count < max_retries:
                response = requests.post(f'{xurl}/api/detail', headers=headers, json=json_data)
                response.encoding = "utf-8"
                data = response.json()
                if data.get('success') is False and data.get('message') == '获取详情失败':
                    time.sleep(1)
                    retry_count += 1
                else:
                    return data
            return None

        def create_video_item(data, did):
            vod_data = data['data']
            return {
                "vod_id": did,
                "vod_director": vod_data['vod_director'],
                "vod_actor": vod_data['vod_actor'],
                "vod_remarks": vod_data['vod_remarks'],
                "vod_year": vod_data['vod_year'],
                "vod_area": vod_data['vod_area'],
                "vod_content": '剧情介绍📢' + vod_data['vod_content'],
                "vod_play_from": "爱影视专线",
                "vod_play_url": vod_data['vod_play_url']
                   }

        def build_result(videos):
            return {'list': videos}
        did = get_video_id(ids)
        if not did:
            return {}
        json_data = build_request_data(did)
        data = fetch_detail_with_retry(json_data)
        if not data:
            return {}
        videos = []
        video_item = create_video_item(data, did)
        videos.append(video_item)
        return build_result(videos)

    def playerContent(self, flag, id, vipFlags):
        result = {}
        result["parse"] = 0
        result["playUrl"] = ''
        result["url"] = id
        result["header"] = headerx
        return result

    def searchContentPage(self, key, quick, pg):
        def build_request_data(key):
            return {
                'api': 'https://bf.xoxowin86cisyap.com/api.php/provide/vod/',
                'keyword': key
                   }

        def fetch_search_with_retry(json_data, max_retries=100):
            retry_count = 0
            while retry_count < max_retries:
                response = requests.post(f'{xurl}/api/search', headers=headers, json=json_data)
                response.encoding = "utf-8"
                data = response.json()
                if data.get('success') is False and data.get('message') == '搜索失败，请稍后再试':
                    time.sleep(1)
                    retry_count += 1
                else:
                    return data
            return None

        def create_video_item(vod):
            return {
                "vod_id": vod['vod_id'],
                "vod_name": vod['vod_name'],
                "vod_pic": vod['vod_pic'],
                "vod_remarks": vod.get('vod_remarks', '暂无备注')
                   }

        def process_search_results(data):
            videos = []
            if 'data' in data:
                for vod in data['data']:
                    video_item = create_video_item(vod)
                    videos.append(video_item)
            return videos

        def build_result(videos, pg):
            return {
                'list': videos,
                'page': pg,
                'pagecount': 9999,
                'limit': 90,
                'total': 999999
                   }
        json_data = build_request_data(key)
        data = fetch_search_with_retry(json_data)
        if not data:
            return {"list": []}
        videos = process_search_results(data)
        return build_result(videos, pg)

    def searchContent(self, key, quick, pg="1"):
        return self.searchContentPage(key, quick, '1')

    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None












