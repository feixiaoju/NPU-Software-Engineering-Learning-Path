  #include "point2D.h"
  float Point2D::getX() const{
      return x;
  }
  float Point2D::getY() const{
	  return y;
  }
  //��ppt�й��캯����ʾ���Ӧ
  /* 1,3*/
  Point2D::Point2D(float initialX, float initialY) {

	  x = initialX;
	  y = initialY;
  }
  Point2D::~Point2D(){

  }

