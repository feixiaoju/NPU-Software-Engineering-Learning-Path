#include <iostream>
#include "Triangle.h"
using std::cout;
using std::endl;
  int main(){
      Point2D *pointOne= new Point2D(30,30);
      cout<<"x and y of pointOne are "<<pointOne->getX()
                          <<" and "<<pointOne->getY()
						  <<"  address: "<<pointOne<<endl;
      Point2D *pointTwo = pointOne;//��ֵ
      cout<<"x and y of pointTwo are "<<pointTwo->getX()
                          <<" and "<<pointTwo->getY()
						  <<"  address:  "<<pointTwo<<endl;
	  delete pointOne;
/**/
      
	  //��ʾ��������ĸ�ֵ      
      /*
      Point2D pointOne(30,30), pointTwo;
      cout<<"x and y of pointOne are "<<pointOne.getX()
                          <<" and "<<pointOne.getY()
						  <<"  address: "<<&pointOne<<endl;
      cout<<"x and y of pointTwo are "<<pointTwo.getX()
                          <<" and "<<pointTwo.getY()
						  <<"  address:  "<<&pointTwo<<endl;
      pointTwo = pointOne;//��ֵ
      cout<<"x and y of pointTwo are "<<pointTwo.getX()
                          <<" and "<<pointTwo.getY()
						  <<"  address:  "<<&pointTwo<<endl;
	*/
	
	 
      /*Point2D pointOne(30,30);
	  Point2D pointThree(pointOne);//���ƹ��캯���Զ����õĵ�һ�����
      Point2D pointFour = pointOne;//���ƹ��캯���Զ����õĵ�һ�����
      cout<<"x and y of pointOne are "<<pointOne.getX()
                          <<" and "<<pointOne.getY()
						  <<"  address: "<<&pointOne<<endl;
      cout<<"x and y of pointTwo are "<<pointThree.getX()
                          <<" and "<<pointThree.getY()
						  <<"  address:  "<<&pointThree<<endl;
	  cout<<"x and y of pointTwo are "<<pointFour.getX()
                          <<" and "<<pointFour.getY()
						  <<"  address:  "<<&pointFour<<endl;
*/
	
     /*  Point2D p1(1,1);
      Point2D p2(2,2);
	  Triangle triangle = Triangle(p1,p2, Point2D(3,3));//���ƹ��캯���Զ����õĵڶ������
	  cout<<"stopping" <<endl;
	 Point2D pointFive;
	  pointFive = triangle.getFirstPoint();//���ƹ��캯���Զ����õĵ��������
	  cout<<"the first point of this triangle:\n" 
	              <<pointFive.getX()<<endl;
	  */
      return 0;
  }
