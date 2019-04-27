# GraphTorch

![Badge](https://img.shields.io/badge/graph%20analysis-graph%20torch-red.svg?logoColor=red&link=https://graphtorch.herokuapp.com/&labelColor=black&logoWidth=15&color=red&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAY1BMVEX////tbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDDtbDD7vRzwfCz6uB71nST8whv5sh/ucS/1lyXzjCjxgiv4rSD2oiPyhynvdy30kif3pyJbfccTAAAAEXRSTlMAwNCAEJD/4DDwYEBQcCCgsFxBI1UAAAO5SURBVHgBxZsLYqo8EIUJhAPhAaKOWrFe97/Kv3+9cBuxjOjE+TZwTieZR6YYSWHixEaapECWR4rYDHBFpEiJL1QdGFUHQwhQRXrE+MIp3sQa/xPrZWODb9JIDYdvSt08AEykRYIrhbaBWNsASm0DrV5HvOJ0s0CvIDvonkGOkUytFww0kQIZ/lFqzQMDiVYODLTKAYBRDoBCOyjgE70Z65QNGOgaSKBroIKugdzpGrAZVA3YGHfQ1jfK+jDK+lgp6yNR03/r46iJ8RulVv0Z0NbPovBUg75SEhSYo1bWR66s70RyrEqSonxKHyu5FHdts1wftWiMU8vNPxMaiRNo3ZjUOZ//QapAMSi53B/AOVLxXuOam43woiRsyiqp7GvjfuztgRacgC1WL93LMd71nQvIn4BNHb4xxavZ4Ow1mg4LTqAa5EuBxVMxHAlLfGu+Ftn9xcMWiKW+0S+EXl38AfhVqHEy02H+Y8haYcEJGKlNxb+73YJn/IsbsekUAxk8mHE0FWvMWIj1lobt+w34d7fWMmDE3gc5pvBZWELMQImFJN6TrRFYgS8lKatYcDxu8QoCRxBrGwBHt8YMRfg7uJl1kAisQBm2tNsHfKIYcByItgEndLB8ENGRaQ3PU4HlSEQ9fqUS+GcsewRzIUiDV4ENfXFiBqRnaR47AaKOaU4BG0FP3xzDPNVX4PikK4cwlQAc546u9EESsQTHjv6yCdIOUjCcaAS/0sokIaNPIVZmdoE+hVgaVgv0KURLTh/S5w0YkVbM6BNmCFEF/pDPJsBg2DBDgEcfYHFaLtCnA2ZIpcfBNU1YQ/4WJkwDePgKIBZ+E+1owgdmkc3CAzEBCGzgTEwAQhs40YQeQQ3wATiCQXIe2z4RgEwyDTezN2DzKVgHar4GTfrQ/YqUCpbiP/MnsKNebiq0bBGYtIH9/ZRsBEfCfsbANT693BM9fczA5aZJnMXep/ljBkbF/c6rCgKruuwhA8OK5tjdr8ux6Nv0QHfYfOzPn6O1g9zLyDo+DdnCnMnuyI7Esp4GQDIEHTF0IjdgoOC68ZST7MccZvEZHGU3pY1j26FPL/0tR7UsBJ1XB2Mb4oPZC83wIaDPjef7mUTYCujzDtadiL68g86Lf+vpSzvY0JTdmn0Ry7Wl/XbakDAS4ge4eQaf8+nnOVw8eaQ2Ese2uOV4uPRfXA6fe7/851EQygw8YX98XGS8fDJEX8VCVtgoNGXrflNP8+g9VO0kDm5VN9E7sWWSGhMDmTFtUr0g/h+SiMqn8ARC2QAAAABJRU5ErkJggg==)

* Graph Torch is a website for graph analysis. Users can push their own graph files onto the GitHub first. The they can specify the file path in the graph analysis page. After clicking the torch button, the backend will automatically analyze the graph file. There are two types of graphs can be analyzed, homogeneous and heterogenous. The file format for each graph file is specified in `About` page. For each types of graphs, the analysis includes reciprocities, edge entropy and gini coefficients etc. Some results will also be plotted.
* Currently I deploy the website on `heroku`, but since the python script for graph analysis needs another `process` resource that currently not provided by `heroku`. The analysis part is not working at that deployment.

## Home Page
* From the `Home` page you can direct to other pages from the nav bar.
<p align="center">
   <img src="https://github.com/RagnaroWA/graphTorch/blob/assets/image/home-page.gif" width="840" height="400" />
</p>

## Homogeneous Graph Page
* The equation of those analysis is shown in `About` page.
* You can also download your homogeneous graph analysis report.
<p align="center">
   <img src="https://github.com/RagnaroWA/graphTorch/blob/assets/image/homo-page.gif" width="840" height="400" />
</p>

## Heterogeneous Graph Page
* The equation of those analysis is shown in `About` page.
* You can also download your heterogeneous graph analysis report.
<p align="center">
   <img src="https://github.com/RagnaroWA/graphTorch/blob/assets/image/hete-page.gif" width="840" height="400" />
</p>

## About Page
* You can view file format and used equations here.
<p align="center">
   <img src="https://github.com/RagnaroWA/graphTorch/blob/assets/image/about-page.gif" width="840" height="400" />
</p>

## PDF Analysis Report
* The PDF analysis report can be downloaded after clicking the download button. Sample PDF is shown below.
<p align="center">
   <img src="https://github.com/RagnaroWA/graphTorch/blob/assets/image/pdf-report.png" width="400" height="565.6" />
</p>
<p align="center"><a href="https://github.com/RagnaroWA/graphTorch/blob/assets/graphAnalysis.pdf">View the Sample PDF Analysis Report Here</a></p>
