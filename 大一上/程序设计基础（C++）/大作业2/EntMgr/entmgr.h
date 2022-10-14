#include <string>
#include <vector>
#include <iostream>
using namespace std;


//�ַ���ת��ֵ����
template <class Type>
Type stringToNum(const string& str);


//��ֵ����ת�ַ���
template <class Type>
string NumToString(Type t);

class Base64{
private:
    std::string _base64_table;
    static const char base64_pad = '=';public:
    Base64()
    {
        _base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; /*����Base64����ʹ�õı�׼�ֵ�*/
    }
    /**
     * ���������unsigned���ͣ�����������ĵ�ʱ�����
     */
    std::string Encode(const unsigned char * str,int bytes);
    std::string Decode(const char *str,int bytes);
    void Debug(bool open = true);
};

//��Ա�Ļ���
class Staff
{
public:
	Staff(string strName, string strNumId, string strTel, string strSex, string strEntryTime);
	~Staff();
	string m_strName;
	string m_strNumId;
	string m_strTel;
	string m_strSex;
	string m_strEntryTime;
};


	
//����Ա
class Seller : public Staff
{
public:
	Seller(string strName, string strNumId, string strTel, string strSex, string strEntryTime, string strSalesVolume):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime),m_strSalesVolume(strSalesVolume)
	{
		
	}
	string m_strSalesVolume;   //�������ܵ����۶�
	~Seller();
};


//������Դ
class Hr : public Staff
{
public:
	Hr(string strName, string strNumId, string strTel, string strSex, string strEntryTime):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime)
	  {
	  
	  }
	~Hr();
};


//�ֿ����Ա
class Stocker : public Staff
{
public:
	Stocker(string strName, string strNumId, string strTel, string strSex, string strEntryTime):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime)
	  {
	  
	  
	  }
	~Stocker();
	//string m_strSalesVolume;   //�������ܵ����۶�
	//���
	//����
};

//����Դ��
//�������ݴ��ı��ж�ȡ�����µ��ı���
//��ʹ�ö�άstlǶ���������ݱ������ڴ���
class DataSrc
{
	// �������
public:
	string m_strFileName;

	// ���巽��
public:
	DataSrc(string strFileName);
	virtual ~DataSrc();
	vector<string> GetData();
	bool SaveData(vector<string>);
	//vector<string>  m_vecDataStr;  //ÿ���ַ���
	
};

class Department
{
public:
	Department(string strCfgName);
	virtual bool Load() = 0;
	virtual bool Save() = 0;
	virtual bool AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime) = 0;
	virtual bool DelEmpByNumId(string strNumId);
	virtual void PrintList();
	Staff* GetEmpByNumId(string strNumId);
	string m_strCfgName;
	//��������
	string m_strDepName;
	vector<Staff*> m_vecEmp;
	~Department();
};



class SellerDep : public DataSrc, public Department
{
public:
	SellerDep(string strCfgName):DataSrc(strCfgName), Department(strCfgName)
	{
		m_strDepName = "���۲�";
	}
	SellerDep();
	~SellerDep();
	bool AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime);
	void PrintList();
	bool Load();
	bool Save();
};

class HrDep : public DataSrc, public Department
{
public:
	HrDep(string strCfgName):DataSrc(strCfgName), Department(strCfgName)
	{
		m_strDepName = "������Դ��";
	}
	//HrDep();
	bool AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime);
	bool Load();
	bool Save();
	~HrDep();
};

class StockDep : public DataSrc, public Department
{
public:
	StockDep(string strCfgName):DataSrc(strCfgName), Department(strCfgName)
	{
		m_strDepName = "��沿";
	}
	bool AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime);
	//HrDep();
    bool Load();
	bool Save();
	~StockDep();
};



class Goods
{
public:
	Goods(string strGoodsId, string strGoodsName, string strNum, string strPrice)
	{
		m_strGoodsId = strGoodsId;  //��ƷID
		m_strGoodsName = strGoodsName;	//��Ʒ����
		m_strNum = strNum;   //����
		m_strPrice = strPrice;  //�۸�
	}

	//�������캯��
	Goods(const Goods& others)
	{
		m_strGoodsId = others.m_strGoodsId;  //��ƷID
		m_strGoodsName = others.m_strGoodsName;	//��Ʒ����
		m_strNum = others.m_strNum;   //����
		m_strPrice = others.m_strPrice;  //�۸�
	}
	
	Goods operator+(const Goods& pOther);
	//friend Goods operator-(Goods& pt, Goods pOther);


	string m_strGoodsId;  //��ƷID
	string m_strGoodsName;	//��Ʒ����
	string m_strNum;   //����
	string m_strPrice;  //�۸�
	~Goods();
private:
	
};

class Stock : public DataSrc
{
public:
	Stock(string strCfgName):DataSrc(strCfgName)
	{
		
	}
	bool AddGoods(string strGoodsId, string strGoodsName, string strNum, string strPrice);
	bool OutOfGoods(string strGoodsId, string strNum);
	bool GetGoodsById(string strGoodsId, Goods& goods);
    bool Load();
	bool Save();
	void PrintList();
	~Stock();
private:	
	vector<Goods> m_vecGoods;
};

class SaleRecord
{
public:
	SaleRecord(string strSallerId, string strSallerName, string strGoodsId, string strGoodsName, string strNum, string strMoney, string strTransTime)
	{
		m_strSallerId = strSallerId;  //����ԱID
		m_strSallerName = strSallerName;	//����Ա����
		m_strGoodsId = strGoodsId;  //��ƷID
		m_strGoodsName = strGoodsName;	//��Ʒ����
		m_strNum = strNum;   //����
		m_strMoney = strMoney;  //���
		m_strTransTime = strTransTime; //����ʱ��
	}

	string m_strSallerId;  //����ԱID
	string m_strSallerName;	//����Ա����
	string m_strGoodsId;  //��ƷID
	string m_strGoodsName;	//��Ʒ����
	string m_strNum;   //����
	string m_strMoney;  //���
	string m_strTransTime; //����ʱ��
	~SaleRecord();
};

class SalesList : public DataSrc
{
public:
	SalesList(string strCfgName):DataSrc(strCfgName)
	{
		
	}
	bool AddSaleRecord(string strSallerId, string strSallerName, string strGoodsId, string strGoodsName, string strNum, string strMoney, string strTransTime);	
    bool Load();
	bool Save();
	void PrintSalesList();
	~SalesList();
private:	
	vector<SaleRecord> m_vecSaleRecord;
};

class EntMgr
{
public:
	EntMgr();
	~EntMgr();
	vector<Department*> m_vecDep;
	Stock *m_pStock;
	SalesList *m_pSalesList;
public:
	bool InitLoad();
	void PrintEmp();
	Department* GetDepByName(string strDepName);
	bool DelEmp(string strNumId);
	Staff* GetEmp(string strNumId);
};


//�û���
class User
{
public:
	User();
	~User();
	bool LoadUser();
	bool LoadPwd();
	bool ChangePwd();
	string m_strUName;
	string m_strPwd;

};