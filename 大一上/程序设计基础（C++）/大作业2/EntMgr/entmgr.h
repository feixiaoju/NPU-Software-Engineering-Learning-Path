#include <string>
#include <vector>
#include <iostream>
using namespace std;


//字符串转数值类型
template <class Type>
Type stringToNum(const string& str);


//数值类型转字符串
template <class Type>
string NumToString(Type t);

class Base64{
private:
    std::string _base64_table;
    static const char base64_pad = '=';public:
    Base64()
    {
        _base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; /*这是Base64编码使用的标准字典*/
    }
    /**
     * 这里必须是unsigned类型，否则编码中文的时候出错
     */
    std::string Encode(const unsigned char * str,int bytes);
    std::string Decode(const char *str,int bytes);
    void Debug(bool open = true);
};

//雇员的基类
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


	
//销售员
class Seller : public Staff
{
public:
	Seller(string strName, string strNumId, string strTel, string strSex, string strEntryTime, string strSalesVolume):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime),m_strSalesVolume(strSalesVolume)
	{
		
	}
	string m_strSalesVolume;   //本财年总的销售额
	~Seller();
};


//人力资源
class Hr : public Staff
{
public:
	Hr(string strName, string strNumId, string strTel, string strSex, string strEntryTime):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime)
	  {
	  
	  }
	~Hr();
};


//仓库管理员
class Stocker : public Staff
{
public:
	Stocker(string strName, string strNumId, string strTel, string strSex, string strEntryTime):
	  Staff(strName, strNumId, strTel, strSex, strEntryTime)
	  {
	  
	  
	  }
	~Stocker();
	//string m_strSalesVolume;   //本财年总的销售额
	//入库
	//出库
};

//数据源类
//负责数据从文本中读取，更新到文本中
//并使用二维stl嵌套来将数据保存在内存中
class DataSrc
{
	// 定义变量
public:
	string m_strFileName;

	// 定义方法
public:
	DataSrc(string strFileName);
	virtual ~DataSrc();
	vector<string> GetData();
	bool SaveData(vector<string>);
	//vector<string>  m_vecDataStr;  //每行字符串
	
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
	//部门名称
	string m_strDepName;
	vector<Staff*> m_vecEmp;
	~Department();
};



class SellerDep : public DataSrc, public Department
{
public:
	SellerDep(string strCfgName):DataSrc(strCfgName), Department(strCfgName)
	{
		m_strDepName = "销售部";
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
		m_strDepName = "人力资源部";
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
		m_strDepName = "库存部";
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
		m_strGoodsId = strGoodsId;  //商品ID
		m_strGoodsName = strGoodsName;	//商品名称
		m_strNum = strNum;   //数量
		m_strPrice = strPrice;  //价格
	}

	//拷贝构造函数
	Goods(const Goods& others)
	{
		m_strGoodsId = others.m_strGoodsId;  //商品ID
		m_strGoodsName = others.m_strGoodsName;	//商品名称
		m_strNum = others.m_strNum;   //数量
		m_strPrice = others.m_strPrice;  //价格
	}
	
	Goods operator+(const Goods& pOther);
	//friend Goods operator-(Goods& pt, Goods pOther);


	string m_strGoodsId;  //商品ID
	string m_strGoodsName;	//商品名称
	string m_strNum;   //数量
	string m_strPrice;  //价格
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
		m_strSallerId = strSallerId;  //销售员ID
		m_strSallerName = strSallerName;	//销售员名称
		m_strGoodsId = strGoodsId;  //商品ID
		m_strGoodsName = strGoodsName;	//商品名称
		m_strNum = strNum;   //数量
		m_strMoney = strMoney;  //金额
		m_strTransTime = strTransTime; //交易时间
	}

	string m_strSallerId;  //销售员ID
	string m_strSallerName;	//销售员名称
	string m_strGoodsId;  //商品ID
	string m_strGoodsName;	//商品名称
	string m_strNum;   //数量
	string m_strMoney;  //金额
	string m_strTransTime; //交易时间
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


//用户类
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