
class Point2D {
        private:
                 float x;
                 float y;
        public:
                  float getX() const;
                  float getY()  const;
      //��ppt�й��캯����ʾ���Ӧ
      //1         Point2D(float, float);
      //2         Point2D(float initialX, float initialY):x(initialX),y(initialY){}
                 Point2D(float initialX=200, float initialY=200);//3
                 ~Point2D();

};
