rm(list=ls())

yes<-0
no<-0

simulations<-20000

intervalWidths<-vector("numeric",simulations)

for(i in 1:simulations){
  myData<-rgamma(10,1)
  med<-qgamma(0.5,1)
  lowerBound<-min(myData)
  upperBound<-max(myData)
  ifelse(lowerBound<med&&med<upperBound,yes<-yes+1,no<-no+1)
  intervalWidths[i]<-upperBound-lowerBound
}

show(summary(intervalWidths))
show(yes/simulations)

#Question 1
#Confidence level is 0.9981

#Question 2
#smallest 0.3987
#largest 12.0486
#average width 2.8279
#median width 2.5973

yes<-0
no<-0

for(i in 1:simulations){
  myData<-rgamma(9,1)
  outlier<-rgamma(1,1)*(1 + 9999*rbinom(1,1,1/1000))
  med<-qgamma(0.5,1)
  lowerBound<-min(myData,outlier)
  upperBound<-max(myData,outlier)
  ifelse(lowerBound<med&&med<upperBound,yes<-yes+1,no<-no+1)
  intervalWidths[i]<-upperBound-lowerBound
}

show(summary(intervalWidths))
show(yes/simulations)


#Question 3
#Confidence level is 0.9979
#little no difference with the outliers in the confidence level

#Question 4
#smallest 0.4
#largest 32954.52
#average width 10.83
#median width 2.6
#The outliers caused the max to be much larger 
#which caused the average CI to also be larger
