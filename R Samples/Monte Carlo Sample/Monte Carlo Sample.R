rm(list=ls())

yes<-0
no<-0

msSd<-(20-10)/3.29
lsSd<-(8+2)/3.29
rmsSd<-(9-3)/3.29
plSd<-(35000-15000)/3.29
breakEven<-400000

simulations<-100000

for(i in 1:simulations){
  ms<-rnorm(1,15,msSd)
  ls<-rnorm(1,3,lsSd)
  rms<-rnorm(1,6,rmsSd)
  pl<-rnorm(1,25000,plSd)
  annualSavings<-(ms+ls+rms)*pl
  contract<-rbinom(1,1,0.1)
  monthsLost<-runif(1,0,12)
  adjPL<-pl-(1000*contract*monthsLost)
  adjSave<-(ms+ls+rms)*adjPL
  ifelse(adjSave>=breakEven,yes<-yes+1,no<-no+1)
}

show(yes/simulations)
#100 sims: 79%
#500 sims: 83.8%
#20000 sims: 82.67%
#100000 sims: 83.29%