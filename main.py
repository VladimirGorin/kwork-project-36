from telethon.sync import TelegramClient
from configparser import ConfigParser
import pandas as pd
import os
import time
import re

config = ConfigParser()
config.read('config.ini')

api_id = config['Telegram']['api_id']
api_hash = config['Telegram']['api_hash']

client = TelegramClient(config['Telegram']['phone_number'], api_id, api_hash)

client.connect()

df = pd.read_csv('./data/phones.csv')

result_file_path = './result.csv'
if os.path.exists(result_file_path):
    os.remove(result_file_path)

if not client.is_user_authorized():
    client.send_code_request(config['Telegram']['phone_number'])

    try:
        client.sign_in(config['Telegram']['phone_number'], input('Введите код из SMS:'))
    except Exception as e:
        if "Two-steps verification is enabled and a password is required (caused by SignInRequest)" in str(e):
            while True:
                password = input('Введите пароль: ')
                try:
                    client.sign_in(password=password)
                    break
                except Exception as e:
                    print(f"Неверный пароль. Попробуйте еще раз. Ошибка: {e}")
        else:
            print(f"Произошла ошибка: {e}")

result_df_list = []

for index, row in df.iterrows():
    phone_number = str(row['Номер телефона'])

    try:
        client.send_message("@Random11018_bot", phone_number)

        print(f"\nПолучаем информацию по номеру: {phone_number}")
        time.sleep(40)
        print(f"Успешно\n")

        text = client.get_messages("@Random11018_bot", limit=1)[0].message
        if "Превышен суточный лимит поиска по запросу!" in text:
            print(f"\nПревышен суточный лимит\n")
            break 

        region_pattern = re.compile(r"Регион: (.+)")
        names_pattern = re.compile(r"Возможные имена и теги\n└  (.+)")
        emails_pattern = re.compile(r"E-mail\n└ (.+)")
        social_pattern = re.compile(r"Социальные сети\n├Вконтакте: (.+)\n└Telegram: (.+)")

        region_match = re.search(region_pattern, text)
        names_match = re.search(names_pattern, text)
        emails_match = re.search(emails_pattern, text)
        social_match = re.search(social_pattern, text)

        region = region_match.group(1) if region_match else None
        names = names_match.group(1) if names_match else None
        emails = emails_match.group(1) if emails_match else None
        vkontakte = social_match.group(1) if social_match else None
        telegram = social_match.group(2) if social_match else None

        result_df_list.append({
            'Номер телефона': phone_number,
            'Регион': region,
            'Имена': names,
            'Почты': emails,
            'Соц-сети': f"Вконтакте: {vkontakte}, Telegram: {telegram}"
        })

    except Exception as e:
        print(f"\nНе удалось отправить/получить сообщение для номера {phone_number}. Ошибка: {e}\n")

result_df = pd.DataFrame(result_df_list)
result_df.to_csv(result_file_path, index=False)

print("\nПрограмма завершена.")

client.disconnect()
