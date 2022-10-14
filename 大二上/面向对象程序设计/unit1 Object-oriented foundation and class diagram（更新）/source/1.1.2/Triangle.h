/*
 * Triangle.h
 *
 *  Created on: 2013-10-22
 *      Author: Administrator
 */
/*
	#ifndef ָʾ���ָ����Ԥ�����������Ƿ�δ���塣
	���Ԥ����������δ���壬��ô������������ָʾ��������
	ֱ������ #endif
	ͷ�ļ�Ӧ�ú��б���������ʹ��Щͷ�ļ����ᱻ����ͷ
       �ļ���������дͷ�ļ��������������ѣ��������ͷ��
      ����������Σ������Ա����������ı������
 */

#ifndef TRIANGLE_H_
#define TRIANGLE_H_
#include "point2D.h"
class Triangle {
   private:
		Point2D pointOne;
		Point2D pointTwo;
		Point2D pointThree;
   public:
		Triangle(Point2D initialPointOne, 
		          Point2D initialPointTwo,
		          Point2D initialPointThree);
	    Point2D getFirstPoint();
};
#endif /* TRIANGLE_H_ */
