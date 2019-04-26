import math

class Homo():

	def __init__(self):
		self.graph = {}
		self.num_vertices = 0
		self.vertices = {}
		self.num_edges = 0
		self.num_incoming_edges = 0
		self.num_outcoming_edges = 0
		self.type = 'undirect'
		self.incoming = {}
		self.outcoming = {}

		self.max_degree = 0
		self.min_degree = float("inf")
		self.max_income_degree = 0
		self.min_income_degree = float("inf")
		self.max_outcome_degree = 0
		self.min_outcome_degree = float("inf")

	def load_helper(self):
		"""
		helper function for load graph
		"""
		# self.num_vertices = len(self.vertices)
		checked = False
		for x in self.graph:
			for y in self.graph[x]:
				if y not in self.graph or x not in self.graph[y]:
					self.type = "direct"
					checked = True
					break
			if checked == True:
				break

		for x in self.graph:
			if x not in self.vertices:
				self.vertices[x] = len(self.graph[x])
			else:
				self.vertices[x] += len(self.graph[x])
			if self.type == "direct":
				self.outcoming[x] = len(self.graph[x])
			for y in self.graph[x]:
				if self.type == "direct":
					if y not in self.vertices:
						self.vertices[y] = 1
					else:
						self.vertices[y] += 1

					if y not in self.incoming:
						self.incoming[y] = 1
					else:
						self.incoming[y] += 1

		for x in self.incoming:
			if self.incoming[x] > self.max_income_degree:
				self.max_income_degree = self.incoming[x]
			if self.incoming[x] < self.min_income_degree:
				self.min_income_degree = self.incoming[x]
			self.num_incoming_edges += self.incoming[x]
		for x in self.outcoming:
			if self.outcoming[x] > self.max_outcome_degree:
				self.max_outcome_degree = self.outcoming[x]
			if self.outcoming[x] < self.min_outcome_degree:
				self.min_outcome_degree = self.outcoming[x]
			self.num_outcoming_edges += self.outcoming[x]

	def load_data_file(self, file_name):
		"""
		load the graph data from file
		:param file_name: file name
		"""
		with open(file_name, "r") as f:
			for i, line in enumerate(f):
				line = line[0:len(line) - 1].split(" ")
				x = line[0]
				y = line[1]
				if x in self.graph:
					self.graph[x][y] = 1
					self.num_edges += 1
				else:
					self.graph[x] = {y : 1}
					self.num_edges += 1
		self.load_helper()

	def load_data_dict(self, dictionary):
		"""
		load data from dictionary
		:param dictionary: dictionary
		"""
		for x in dictionary:
			for y in dictionary[x]:
				if x in self.graph:
					self.graph[x][y] = 1
					self.num_edges += 1
				else:
					self.graph[x] = {y : 1}
					self.num_edges += 1
		self.load_helper()

	def reciprocity(self):
		if self.type == 'undirect':
			return 1
		proportion = 0
		for x in self.graph:
			for y in self.graph[x]:
				if y in self.graph:
					if x in self.graph[y]:
						proportion += 1
		return proportion / self.num_edges / 2

	def gini(self):
		"""
		calculate the gini coefficient
		:return:
		"""
		d_total = sorted(self.vertices.values())
		n = len(d_total)

		gini_total_numerator = 0
		gini_total_denumerator = 0
		for i in range(n):
			gini_total_numerator += (i + 1) * d_total[i]
			gini_total_denumerator += d_total[i]
		G_total = 2 * gini_total_numerator / gini_total_denumerator / n - (n + 1) / n

		if self.type == 'undirect':
			return G_total, G_total, G_total

		incoming_sort = sorted(self.incoming.values())
		incoming_n = len(self.incoming)
		gini_incoming_numerator = 0
		gini_incoming_denumerator = 0
		for i in range(incoming_n):
			gini_incoming_numerator += (i + 1) * incoming_sort[i]
			gini_incoming_denumerator += incoming_sort[i]
		G_incoming = 2 * gini_incoming_numerator / gini_incoming_denumerator / incoming_n - (incoming_n + 1) / incoming_n
		
		outcoming_sort = sorted(self.outcoming.values())
		outcoming_n = len(self.outcoming)
		gini_outcoming_numerator = 0
		gini_outcoming_denumerator = 0
		for i in range(outcoming_n):
			gini_outcoming_numerator += (i + 1) * outcoming_sort[i]
			gini_outcoming_denumerator += outcoming_sort[i]
		G_outcoming = 2 * gini_outcoming_numerator / gini_outcoming_denumerator / outcoming_n - (outcoming_n + 1) / outcoming_n

		return G_total, G_incoming, G_outcoming

	def edge_entropy(self):
		"""
		calculate the edge entropy
		:return:
		"""
		n = len(self.vertices)
		n_const = 1 / math.log(n)
		H_total = 0
		for u in self.vertices:
			first = -1 * self.vertices[u] / 2 / self.num_edges
			second = math.log(self.vertices[u] / 2 / self.num_edges)
			H_total += first * second
		H_total *= n_const

		if self.type == 'undirect':
			return H_total, H_total, H_total

		incoming_n = len(self.incoming)
		n_const = 1 / math.log(incoming_n)
		H_total_income = 0
		for u in self.incoming:
			first = -1 * self.incoming[u] / 2 / self.num_incoming_edges
			second = math.log(self.incoming[u] / 2 / self.num_incoming_edges)
			H_total_income += first * second
		H_total_income *= n_const

		outcoming_n = len(self.outcoming)
		n_const = 1 / math.log(outcoming_n)
		H_total_outcome = 0
		for u in self.outcoming:
			first = -1 * self.outcoming[u] / 2 / self.num_outcoming_edges
			second = math.log(self.outcoming[u] / 2 / self.num_outcoming_edges)
			H_total_outcome += first * second
		H_total_outcome *= n_const

		return H_total, H_total_income, H_total_outcome

	def degree(self):
		"""
		calculate the degree information
		:return:
		"""
		for x in self.vertices:
			if self.vertices[x] > self.max_degree:
				self.max_degree = self.vertices[x]
			if self.vertices[x] < self.min_degree:
				self.min_degree = self.vertices[x]
		income_length = len(self.incoming)
		outcome_length = len(self.outcoming)
		if income_length == 0:
			income_length = 1
		if outcome_length == 0:
			outcome_length = 1
		return self.num_edges / len(self.vertices), self.max_degree, self.min_degree, \
				self.num_incoming_edges / income_length, self.max_income_degree, self.min_income_degree, \
				self.num_outcoming_edges / outcome_length, self.max_outcome_degree, self.min_outcome_degree


class Hete():

	def __init__(self, num_paths):
		self.graphs = {}
		self.paths = []
		self.vertices = {}
		self.types = {}
		self.num_paths = num_paths
		self.links = {}
		self.metapath = {}

	def metapath_ex(self):
		"""
		hete metapath expansion
		"""
		path_2 = []
		for t in self.types:
			for t2 in self.types:
				if t != t2:
					two = (t, t2)
					path_2.append(two)
		path_3 = []
		for t in path_2:
			for t2 in self.types:
				if t2 == t[0]:
					three = (t[0], t[1], t2)
					path_3.append(three)
		if self.num_paths > 3:
			self.num_paths = 3
		path_3 = path_3[0: self.num_paths]
		self.paths = path_3
		for path in self.paths:
			meta = "".join(path)
			self.metapath[meta] = {}
			for node in self.types[path[0]]:
				for node1 in self.types[path[1]]:
					if node1 in self.links[node]:
						for node2 in self.types[path[2]]:
							if node2 != node and node2 in self.links[node1]:
								if node in self.metapath[meta]:
									self.metapath[meta][node][node2] = 1
								else:
									self.metapath[meta][node] = {node2 : 1}

	def load_data_file(self, file_name):
		"""
		load hete data from the file
		:param file_name:
		"""
		with open(file_name, "r") as f:
			for i, line in enumerate(f):
				if ":" in line:
					line = line[0:len(line) - 1].split(":")
					self.vertices[line[0]] = line[1]
					if line[1] not in self.types:
						self.types[line[1]] = [line[0]]
					else:
						self.types[line[1]].append(line[0])
				else:
					line = line[0:len(line) - 1].split(" ")
					if line[0] in self.links:
						self.links[line[0]][line[1]] = 1
					else:
						self.links[line[0]] = {line[1] : 1}
		self.metapath_ex()