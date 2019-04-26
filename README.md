# GraphTorch

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
