import sys
import requests
from graph import *

def heterogeneous_process():
    try:
        filePath = sys.argv[1]
        metaNum = sys.argv[2]
    except:
        filePath = "abc"
        metaNum = 3
    # file = get_file(filePath)
    invalid_num = False
    num = -1
    try:
        num = int(metaNum)
    except:
        invalid_num = True
    #
    # if invalid_num == True:
    #     print("Your input filePath " + filePath + " with #metapath=" + metaNum + " is invalid.")
    #     return

    process(filePath, num)

def process(filePath, num):
    gs = Hete(num)
    gs.load_data_file('sample/sample_hete.txt')
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
    
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("MetaPaths: " + metapath,end=", ")
        elif i != len(gs.metapath) - 1:
            print(metapath,end=", ")
        else:
            print(metapath,end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("#Vertices: {} ({})".format(info[metapath]['Vertices'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{} ({})".format(info[metapath]['Vertices'], metapath),end=", ")
        else:
            print("{} ({})".format(info[metapath]['Vertices'], metapath),end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("#Edges: {} ({})".format(info[metapath]['Edges'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{} ({})".format(info[metapath]['Edges'], metapath),end=", ")
        else:
            print("{} ({})".format(info[metapath]['Edges'], metapath),end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("Reciprocities: {} ({})".format(info[metapath]['Reciprocity'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{} ({})".format(info[metapath]['Reciprocity'], metapath),end=", ")
        else:
            print("{} ({})".format(info[metapath]['Reciprocity'], metapath),end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("Gini coefficients: {:.3f} ({})".format(info[metapath]['Gini'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{:.3f} ({})".format(info[metapath]['Gini'], metapath),end=", ")
        else:
            print("{:.3f}( {})".format(info[metapath]['Gini'], metapath),end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("Relative edge distribution entropies: {:.3f} ({})".format(info[metapath]['Entropy'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{:.3f} ({})".format(info[metapath]['Entropy'], metapath),end=", ")
        else:
            print("{:.3f} ({})".format(info[metapath]['Entropy'], metapath),end="")
    print()
    for i, metapath in enumerate(gs.metapath):
        if i == 0:
            print("Average degrees: {:.3f} ({})".format(info[metapath]['Degree'], metapath),end=", ")
        elif i != len(gs.metapath) - 1:
            print("{:.3f} ({})".format(info[metapath]['Degree'], metapath),end=", ")
        else:
            print("{:.3f} ({})".format(info[metapath]['Degree'], metapath),end="")
    return None

if __name__ == '__main__':
    heterogeneous_process()