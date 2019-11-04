from selenium.webdriver.firefox.options import Options
from pprint import pprint
from selenium import webdriver
from time import sleep
from random import randint
from json import dump

options = Options()
options.add_argument("--headless")


url = 'https://www.codechef.com/'
levels = ['easy','medium','hard']
questions = {}
no_of_questions = 5    #from each level

for level in levels:
    browser = webdriver.Firefox(executable_path='/home/kaustubhdamania/geckodriver',options=options)
    browser.get(url+'problems/{}/'.format(level))
    question_urls = []
    question_data = []
    elems = browser.find_elements_by_class_name('problemname')
    elems = [ elems[randint(0,len(elems)-1)] for i in range(no_of_questions) ]
    for elem in elems:
        temp_url = elem.find_element_by_tag_name('a').get_attribute('href')
        # print(dir(elem.find_element_by_tag_name('a')))
        print('Elem is {} and url is {}'.format(elem.text,temp_url))
        question_urls.append(temp_url)

    for ques_url in question_urls:
        browser.get(ques_url)
        print('Inside',ques_url)
        sleep(1.5)
        problem_statement = browser.find_element_by_id('problem-statement').get_attribute('innerHTML')
        problem_statement = problem_statement[:problem_statement.index('<!--.problem-statement-->')]
        # print('The problem statement is {}'.format(problem_statement[:problem_statement.index('<!--.problem-statement-->')]))
        question_data.append({
            'url': ques_url,
            'problem_statement': problem_statement
        })
        browser.get(url+'problems/{}/'.format(level))
        sleep(1.5)

    questions[level] = question_data
    browser.close()

with open('questions.json','w') as f:
    dump(questions, f, indent=4)
