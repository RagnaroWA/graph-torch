import sys
import requests
from graph import Homo
import numpy as np

def homogeneous_process():
	try:
		filePath = sys.argv[1]
		partial = sys.argv[2]
	except:
		filePath = None
		partial = "false"
	if partial == "true":
		partial = True
	else:
		partial = False
		# print("has been processed")
	process(filePath, partial)

def process(filePath, partial):
	g = Homo()
	# try:
	g.load_data_file('sample/sample.txt')
	print(g.type)
	print(len(g.vertices))
	print(g.num_edges)
	reciprocity = g.reciprocity()
	print("{:.3f}".format(reciprocity))

	gini_total, gini_income, gini_outcome = g.gini()
	print("{:.3f}".format(gini_total), "{:.3f}".format(gini_income), "{:.3f}".format(gini_outcome))

	if not partial:
		entro_total, entro_income, entro_outcome = g.edge_entropy()
		print("{:.3f}".format(entro_total), "{:.3f}".format(entro_income), "{:.3f}".format(entro_outcome))

	avg_t, max_t, min_t, avg_i, max_i, min_i, avg_o, max_o, min_o = g.degree()
	print("{:.2f}".format(avg_t), max_t, min_t, "{:.2f}".format(avg_i), max_i, min_i, "{:.2f}".format(avg_o), max_o, min_o)
	# except:
	# 	print("Your input filePath " + filePath + " with partial=" + partial + " is invalid.")
	return

def random_graph():
	graph = {}
	graph_test = {}
	for i in range(10):
		graph[i] = {}
		graph_test[i] = {}
	for i in range(10):
		linkto = np.random.randint(10, 20, size=np.random.randint(6))
		for elem in linkto:
			graph[i][elem] = 1
			graph_test[i][elem] = 1
			if elem not in graph:
				graph[elem] = {i: 1}
				graph_test[elem] = {i: 1}
			else:
				graph[elem][i] = 1
				graph_test[elem][i] = 1
	# with open("sample/sample_hete.txt", "w") as f:
	for elem in graph:
		for elem1 in graph[elem]:
			string = str(elem) + " " + str(elem1) + "\n"
	# 			f.write(string)
	for elem in graph:
		string = str(elem) + ":" + str(np.random.randint(0, 3)) + "\n"
	# 		f.write(string)
	for elem in graph_test:
		string = str(elem) + ":" + str(np.random.randint(0, 3)) + "\n"
		print(string)
	for elem in graph:
		string = str(elem) + ":" + str(np.random.randint(0, 3)) + "\n"
		print(string)

if __name__ == '__main__':
	homogeneous_process()
