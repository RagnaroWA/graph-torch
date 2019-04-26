import unittest
from unittest import TestCase
from graph import *
from homo import *
from hete import *
import sys

class graph_test(TestCase):

    def test_init(self):
        gs = Hete(3)
        gs.load_data_file('sample/sample_hete.txt')

    def test_functinoality(self):
        gs = Hete(3)
        gs.load_data_file('sample/sample_hete.txt')
        g = Homo()
        g.load_data_file('sample/sample.txt')
        g.reciprocity()
        g.gini()
        g.edge_entropy()
        g.degree()
        info = {}
        for metapath in gs.metapath:
            g = Homo()
            g.load_data_dict(gs.metapath[metapath])
            info[metapath] = {}
            info[metapath]['Vertices'] = len(g.vertices)
            info[metapath]['Edges'] = g.num_edges
            info[metapath]['Reciprocity'] = g.reciprocity()
            info[metapath]['Gini'] = g.gini()[0]
            info[metapath]['Entropy'] = g.edge_entropy()[0]
            info[metapath]['Degree'] = g.degree()[0]

    def test_homo(self):
        homogeneous_process()
        random_graph()
        heterogeneous_process()