import requests, webbrowser, sys, bs4

def get_notices(date=''):
    # use requests module to retrieve raw data
    if date:
        print('Fetching notices for {}...'.format(date))
    else:
        print('Fetching notices...')

    try:
        result = requests.get('https://web.kamar.cashmere.school.nz/index.php/notices/' + date)
        result.raise_for_status()
    except:
        print('The notices could not be accessed :(')

    # get the tables from raw HTML
    soup = bs4.BeautifulSoup(result.text, 'lxml')
    table = soup.select('.table-responsive')

    # dictionary to store the data
    table_data = {
        "Date": {},
        "Meetings/Practices": {},
        "Notices": {}
    }

    date = soup.select('h4.text-xs-center')[0].getText()
    print(date)
    table_data["Date"] = date

    # separate 2 sections of the table
    table_meetings = table[0]
    table_notices = table[1]


    # get data from the first section of the table (Meetings/practices)
    meetings_rows = table_meetings.select('tr')[1:]

    for i in range(0, len(meetings_rows), 2):
        curr_td_list = meetings_rows[i].select('td')
        curr_message = meetings_rows[i+1].select('td')

        curr_json = {
            "Category": curr_td_list[0].getText().strip(),
            "Location": curr_td_list[2].getText().strip(),
            "Time": curr_td_list[3].getText().strip().replace('  ', ' '),
            "Staff": curr_td_list[4].getText().strip(),
            "Message": curr_message[0].getText().strip()
        }

        curr_title = curr_td_list[1].getText()
        table_data["Meetings/Practices"][curr_title] = curr_json


    # get data from the second section of the table (Notices)
    notices_rows = table_notices.select('tr')[1:]

    for i in range(0, len(notices_rows), 2):
        curr_td_list = notices_rows[i].select('td')
        curr_message = notices_rows[i+1].select('td')

        curr_json = {
            "Category": curr_td_list[0].getText().strip(),
            "Staff": curr_td_list[2].getText().strip(),
            "Message": curr_message[0].getText().strip()
        }

        curr_title = curr_td_list[1].getText()
        table_data["Notices"][curr_title] = curr_json


    return table_data
    #import json
    #with open('result.json', 'w') as fp:
        #json.dump(table_data, fp)


# todo: this function
def parse_text(json_in):
    result = ""

    notices = json_in["Notices"]
    for notice in notices.keys():
        curr_parsed = f"""
{notice}
{format_blank(notices[notice], "Staff")}
{format_blank(notices[notice], "Category")}
{format_blank(notices[notice], "Message")}

"""
        result += curr_parsed


    meetings = json_in["Meetings/Practices"]
    for meeting in meetings.keys():
        curr_parsed = f"""
{meeting}
{format_blank(meetings[meeting], "Staff")}
{format_blank(meetings[meeting], "Category")}
{format_blank(meetings[meeting], "Time")}
{format_blank(meetings[meeting], "Message")}

"""
        result += curr_parsed


    return result


def format_blank(element, key):
    return element[key] if element[key] != "" else f"No {key.lower()} given"


get_notices()
