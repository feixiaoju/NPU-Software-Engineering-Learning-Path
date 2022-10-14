
#include "entmgr.h"
#include "stdio.h"
#include <windows.h>
#include  <fstream>
#include <sstream>

template <class Type>
Type stringToNum(const string& str)
{
	istringstream iss(str);
	Type num;
	iss >> num;
	return num;    
}

template <class Type>
string NumToString(Type t)
{
	ostringstream iss;
	iss << t;
	return iss.str();    
}

std::string Base64::Encode(const unsigned char * str,int bytes) {
	int num = 0,bin = 0,i;
	std::string _encode_result;
	const unsigned char * current;
	current = str;
	while(bytes > 2) {
		_encode_result += _base64_table[current[0] >> 2];
		_encode_result += _base64_table[((current[0] & 0x03) << 4) + (current[1] >> 4)];
		_encode_result += _base64_table[((current[1] & 0x0f) << 2) + (current[2] >> 6)];
		_encode_result += _base64_table[current[2] & 0x3f];

		current += 3;
		bytes -= 3;
	}
	if(bytes > 0)
	{
		_encode_result += _base64_table[current[0] >> 2];
		if(bytes%3 == 1) {
			_encode_result += _base64_table[(current[0] & 0x03) << 4];
			_encode_result += "==";
		} else if(bytes%3 == 2) {
			_encode_result += _base64_table[((current[0] & 0x03) << 4) + (current[1] >> 4)];
			_encode_result += _base64_table[(current[1] & 0x0f) << 2];
			_encode_result += "=";
		}
	}
	return _encode_result;
}
std::string Base64::Decode(const char *str,int length) {
	//解码表
	const char DecodeTable[] =
	{
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -2, -2, -1, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-1, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 62, -2, -2, -2, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -2, -2, -2, -2, -2, -2,
		-2,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -2, -2, -2, -2, -2,
		-2, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
		-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2
	};
	int bin = 0,i=0,pos=0;
	std::string _decode_result;
	const char *current = str;
	char ch;
	while( (ch = *current++) != '\0' && length-- > 0 )
	{
		if (ch == base64_pad) { // 当前一个字符是“=”号
			/*
			先说明一个概念：在解码时，4个字符为一组进行一轮字符匹配。
			两个条件：
			1、如果某一轮匹配的第二个是“=”且第三个字符不是“=”，说明这个带解析字符串不合法，直接返回空
			2、如果当前“=”不是第二个字符，且后面的字符只包含空白符，则说明这个这个条件合法，可以继续。
			*/
			if (*current != '=' && (i % 4) == 1) {
				return NULL;
			}
			continue;
		}
		ch = DecodeTable[ch];
		//这个很重要，用来过滤所有不合法的字符
		if (ch < 0 ) { /* a space or some other separator character, we simply skip over */
			continue;
		}
		switch(i % 4)
		{
		case 0:
			bin = ch << 2;
			break;
		case 1:
			bin |= ch >> 4;
			_decode_result += bin;
			bin = ( ch & 0x0f ) << 4;
			break;
		case 2:
			bin |= ch >> 2;
			_decode_result += bin;
			bin = ( ch & 0x03 ) << 6;
			break;
		case 3:
			bin |= ch;
			_decode_result += bin;
			break;
		}
		i++;
	}
	return _decode_result;
}


Staff::Staff(string strName, string strNumId, string strTel, string strSex, string strEntryTime)
{
	m_strName = strName;
	m_strNumId = strNumId;
	m_strTel = strTel;
	m_strSex = strSex;
	m_strEntryTime = strEntryTime;
}

Staff::~Staff()
{

}

Seller::~Seller()
{

}

Hr::~Hr()
{

}

Stocker::~Stocker()
{

}







Department::Department(string strCfgName)
{
	m_strCfgName = strCfgName;
}

Department::~Department()
{

}

SellerDep::~SellerDep()
{

}

HrDep::~HrDep()
{

}

StockDep::~StockDep()
{

}


Goods::~Goods()
{

}

Stock::~Stock()
{

}

SaleRecord::~SaleRecord()
{

}

SalesList::~SalesList()
{

}

bool Department::DelEmpByNumId(string strNumId)
{
	vector<Staff*>::iterator itor;
	for(itor = m_vecEmp.begin(); itor != m_vecEmp.end(); itor++)
	{
		if((*itor)->m_strNumId.compare(strNumId) == 0)
		{
			m_vecEmp.erase(itor);
			Save();
			return true;		
		}	
	}
	return false;
}

void Department::PrintList()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecEmp.size(); j++)
	{
		Staff *pStaff = m_vecEmp[j];
		string strTmp = m_vecEmp[j]->m_strName + " " + m_vecEmp[j]->m_strNumId + " " +  m_vecEmp[j]->m_strTel +  " " +
			m_vecEmp[j]->m_strSex + " " + m_vecEmp[j]->m_strEntryTime;
		cout << strTmp << endl;
	}
}


Staff* Department::GetEmpByNumId(string strNumId)
{
	vector<Staff*>::iterator itor;
	for(itor = m_vecEmp.begin(); itor != m_vecEmp.end(); itor++)
	{
		if((*itor)->m_strNumId.compare(strNumId) == 0)
		{
			return (*itor);
		}	
	}
	return NULL;
}

DataSrc::DataSrc(string strFileName)
{
	m_strFileName = strFileName;
}

DataSrc::~DataSrc()
{

}


//从文件中读取数据
vector<string> DataSrc::GetData()
{
	vector<string> vecDataStr;
	if ("" != m_strFileName)
	{
		ifstream fin(m_strFileName.c_str());  
		string  strInfo;  
		while (getline(fin, strInfo))
		{  
			if ("" == strInfo)
			{
				break;
			}
			vecDataStr.push_back(strInfo);
		}
	}
	return vecDataStr;
}

bool DataSrc::SaveData(vector<string> vecDataStr)
{
	ofstream fout(m_strFileName.c_str()); 	
	for(int j = 0; j < vecDataStr.size(); j++)
	{
		string strTmp = vecDataStr[j];
		fout << strTmp << endl;
	}
	return true;
}


bool SellerDep::Load()
{
	vector<string> vecSellerStr = GetData();
	for(int i = 0; i < vecSellerStr.size(); i++)
	{
		string strInfo = vecSellerStr[i];
		int iIndex = strInfo.find(" ");
		string strNumId;
		strNumId = strInfo.substr(0, iIndex);

		//姓名
		int iEnd = strInfo.find(" ", iIndex + 1);
		string strName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				
		iIndex = iEnd;

		//Tel
		iEnd = strInfo.find(" ", iIndex + 1);
		string strTel = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				

		//Sex
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strSex = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);					


		//strEntryTime
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strEntryTime = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);

		//SalesVolume
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strSalesVolume = strInfo.substr(iIndex + 1, strInfo.length() - iIndex - 1);

		Staff* pStaff = new Seller(strName, strNumId, strTel, strSex, strEntryTime, strSalesVolume);
		m_vecEmp.push_back(pStaff);
	}
	return true;
}

bool SellerDep::Save()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecEmp.size(); j++)
	{
		Seller *pSeller = (Seller*)m_vecEmp[j];
		string strTmp = m_vecEmp[j]->m_strNumId + " " + m_vecEmp[j]->m_strName + " " +  m_vecEmp[j]->m_strTel +  " " +
			m_vecEmp[j]->m_strSex + " " + m_vecEmp[j]->m_strEntryTime +   " " + pSeller->m_strSalesVolume;
		vecDataStr.push_back(strTmp);

	}
	return SaveData(vecDataStr);
}

void SellerDep::PrintList()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecEmp.size(); j++)
	{
		Seller *pSeller = (Seller*)m_vecEmp[j];
		string strTmp = m_vecEmp[j]->m_strName + " " + m_vecEmp[j]->m_strNumId + " " +  m_vecEmp[j]->m_strTel +  " " +
			m_vecEmp[j]->m_strSex + " " + m_vecEmp[j]->m_strEntryTime +   " " + pSeller->m_strSalesVolume;
		cout << strTmp << endl;
	}	
}


//这里就不做唯一性校验了
bool SellerDep::AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime)
{
	Staff *pStaff = new Seller(strName, strNumId, strTel, strSex, strEntryTime, "0");
	m_vecEmp.push_back(pStaff);
	return Save();
}

bool HrDep::Load()
{
	vector<string> vecSellerStr = GetData();
	for(int i = 0; i < vecSellerStr.size(); i++)
	{
		string strInfo = vecSellerStr[i];
		int iIndex = strInfo.find(" ");
		string strNumId;
		strNumId = strInfo.substr(0, iIndex);

		//姓名
		int iEnd = strInfo.find(" ", iIndex + 1);
		string strName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				
		iIndex = iEnd;

		//Tel
		iEnd = strInfo.find(" ", iIndex + 1);
		string strTel = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				

		//Sex
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strSex = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);	

		//strEntryTime
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strEntryTime = strInfo.substr(iIndex + 1, strInfo.length() - iIndex - 1);

		Staff* pStaff = new Hr(strName, strNumId, strTel, strSex, strEntryTime);
		m_vecEmp.push_back(pStaff);
	}
	return true;
}

bool HrDep::Save()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecEmp.size(); j++)
	{
		string strTmp = m_vecEmp[j]->m_strNumId + " " + m_vecEmp[j]->m_strName + " " +  m_vecEmp[j]->m_strTel +  " " +
			m_vecEmp[j]->m_strSex + " " + m_vecEmp[j]->m_strEntryTime;
		vecDataStr.push_back(strTmp);

	}
	return SaveData(vecDataStr);
	return true;
}

bool HrDep::AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime)
{
	Staff *pStaff = new Hr(strName, strNumId, strTel, strSex, strEntryTime);
	m_vecEmp.push_back(pStaff);
	return Save();
}


bool StockDep::Load()
{
	vector<string> vecSellerStr = GetData();
	for(int i = 0; i < vecSellerStr.size(); i++)
	{
		string strInfo = vecSellerStr[i];
		int iIndex = strInfo.find(" ");
		string strNumId;
		strNumId = strInfo.substr(0, iIndex);

		//姓名
		int iEnd = strInfo.find(" ", iIndex + 1);
		string strName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				
		iIndex = iEnd;

		//Tel
		iEnd = strInfo.find(" ", iIndex + 1);
		string strTel = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				

		//Sex
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strSex = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);	

		//strEntryTime
		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strEntryTime = strInfo.substr(iIndex + 1, strInfo.length() - iIndex - 1);

		Staff* pStaff = new Stocker(strName, strNumId, strTel, strSex, strEntryTime);
		m_vecEmp.push_back(pStaff);
	}
	return true;
}

bool StockDep::Save()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecEmp.size(); j++)
	{
		//Seller *pSeller = (Seller*)m_vecEmp[j];
		string strTmp = m_vecEmp[j]->m_strNumId + " " + m_vecEmp[j]->m_strName + " " +  m_vecEmp[j]->m_strTel +  " " +
			m_vecEmp[j]->m_strSex + " " + m_vecEmp[j]->m_strEntryTime;
		vecDataStr.push_back(strTmp);

	}
	return SaveData(vecDataStr);
	return true;
}

bool StockDep::AddEmp(string strName, string strNumId, string strTel, string strSex, string strEntryTime)
{
	Staff *pStaff = new Stocker(strName, strNumId, strTel, strSex, strEntryTime);
	m_vecEmp.push_back(pStaff);
	return Save();
}

Goods Goods::operator+(const Goods& pOther )
{
	int iNum = stringToNum<int>(this->m_strNum) + stringToNum<int>(pOther.m_strNum);
	this->m_strNum = NumToString<int>(iNum);
	return *this;;
}

Goods operator-(Goods& pt, Goods pOther)
{
	Goods goods = pt;
	int iNum = stringToNum<int>(pt.m_strNum) - stringToNum<int>(pOther.m_strNum);
	goods.m_strNum = NumToString<int>(iNum);
	return goods;
}


bool Stock::Load()
{
	vector<string> vecGoodsStr = GetData();
	for(int i = 0; i < vecGoodsStr.size(); i++)
	{
		string strInfo = vecGoodsStr[i];
		int iIndex = strInfo.find(" ");
		string strGoodsId;
		strGoodsId = strInfo.substr(0, iIndex);

		int iEnd = strInfo.find(" ", iIndex + 1);
		string strGoodsName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				
		iIndex = iEnd;

		iEnd = strInfo.find(" ", iIndex + 1);
		string strNum = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);				

		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strPrice = strInfo.substr(iIndex + 1, strInfo.length() - iIndex - 1);

		Goods goods(strGoodsId, strGoodsName, strNum, strPrice);
		m_vecGoods.push_back(goods);
	}
	cout << "加载库存信息成功!" << endl;
	return true;
}

bool Stock::AddGoods(string strGoodsId, string strGoodsName, string strNum, string strPrice)
{
	Goods goods(strGoodsId, strGoodsName, strNum, strPrice);
	bool bFind = false;
	for(int i = 0; i < m_vecGoods.size(); i++ )
	{
		if (m_vecGoods[i].m_strGoodsId.compare(strGoodsId) == 0)
		{
			m_vecGoods[i] = m_vecGoods[i] + goods;
			bFind = true;
			Save();
			cout << "添加库存成功！" << endl;
			return true;
		}	
	}
	if (false == bFind)
	{
		m_vecGoods.push_back(goods);
		Save();
		cout << "添加库存成功！" << endl;
		return true;	
	}
	return false;
}

bool Stock::OutOfGoods(string strGoodsId, string strNum)
{
	Goods goods(strGoodsId, "", strNum, "");
	bool bFind = false;
	for(int i = 0; i < m_vecGoods.size(); i++ )
	{
		if (m_vecGoods[i].m_strGoodsId.compare(strGoodsId) == 0)
		{
			m_vecGoods[i] = m_vecGoods[i] - goods;
			bFind = true;
			Save();
			cout << "出库成功！" << endl;
			return true;
		}	
	}
	if (false == bFind)
	{		
		cout << "该物品不存在！" << endl;
		return true;	
	}
	return false;
}

bool Stock::GetGoodsById(string strGoodsId, Goods& goods)
{

	for(int i = 0; i < m_vecGoods.size(); i++ )
	{
		if (m_vecGoods[i].m_strGoodsId.compare(strGoodsId) == 0)
		{
			goods = m_vecGoods[i];
			return true;
		}	
	}
	return false;
}


void Stock::PrintList()
{
	cout << "现有库存如下: " << endl;
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecGoods.size(); j++)
	{
		string strTmp = m_vecGoods[j].m_strGoodsId + " " + m_vecGoods[j].m_strGoodsName + " " +  m_vecGoods[j].m_strNum +  " " +
			m_vecGoods[j].m_strPrice;
		cout << strTmp << endl;		
	}

}

bool Stock::Save()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecGoods.size(); j++)
	{
		string strTmp = m_vecGoods[j].m_strGoodsId + " " + m_vecGoods[j].m_strGoodsName + " " +  m_vecGoods[j].m_strNum +  " " +
			m_vecGoods[j].m_strPrice;
		vecDataStr.push_back(strTmp);		
	}
	return SaveData(vecDataStr);
}

bool SalesList::Load()
{
	vector<string> vecSalesListStr = GetData();
	for(int i = 0; i < vecSalesListStr.size(); i++)
	{
		string strInfo = vecSalesListStr[i];
		int iIndex = strInfo.find(" ");
		string strSallerId = strInfo.substr(0, iIndex);

		int iEnd = strInfo.find(" ", iIndex + 1);
		string strSallerName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);


		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strGoodsId = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);

		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strGoodsName = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);

		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strNum = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);

		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strMoney = strInfo.substr(iIndex + 1, iEnd - iIndex - 1);

		iIndex = iEnd;
		iEnd = strInfo.find(" ", iIndex + 1);
		string strTransTime = strInfo.substr(iIndex + 1, strInfo.length() - iIndex - 1);

		SaleRecord saleRecord(strSallerId, strSallerName, strGoodsId, 
			strGoodsName, strNum, strMoney, strTransTime);
		m_vecSaleRecord.push_back(saleRecord);
	}
	cout << "加载库存信息成功!" << endl;
	return true;
}

bool SalesList::Save()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecSaleRecord.size(); j++)
	{
		string strTmp = m_vecSaleRecord[j].m_strSallerId + " " + m_vecSaleRecord[j].m_strSallerName + " " +  m_vecSaleRecord[j].m_strGoodsId +  " " +
			m_vecSaleRecord[j].m_strGoodsName + " " +  m_vecSaleRecord[j].m_strNum + " " + 
			m_vecSaleRecord[j].m_strMoney + " " +  m_vecSaleRecord[j].m_strTransTime;
		vecDataStr.push_back(strTmp);		
	}
	return SaveData(vecDataStr);
}



bool SalesList::AddSaleRecord(string strSallerId, string strSallerName, string strGoodsId, 
	string strGoodsName, string strNum, string strMoney, string strTransTime)
{
	SaleRecord saleRecord(strSallerId, strSallerName, strGoodsId, 
		strGoodsName, strNum, strMoney, strTransTime);
	m_vecSaleRecord.push_back(saleRecord);
	Save();
	cout << "销售开票成功!" << endl;
	return true;
}

void SalesList::PrintSalesList()
{
	vector<string> vecDataStr;
	for(int j = 0; j < m_vecSaleRecord.size(); j++)
	{
		string strTmp = m_vecSaleRecord[j].m_strSallerId + " " + m_vecSaleRecord[j].m_strSallerName + " " +  m_vecSaleRecord[j].m_strGoodsId +  " " +
			m_vecSaleRecord[j].m_strGoodsName + " " +  m_vecSaleRecord[j].m_strNum + " " + 
			m_vecSaleRecord[j].m_strMoney + " " +  m_vecSaleRecord[j].m_strTransTime;
		cout << strTmp << endl;		
	}


}

EntMgr::EntMgr()
{
	m_pStock = NULL;
	m_pSalesList = NULL;	
}

EntMgr::~EntMgr()
{

}

bool EntMgr::InitLoad()
{
	vector<string> vecDepFile;
	vecDepFile.push_back("销售部.txt");
	vecDepFile.push_back("人力资源部.txt");
	vecDepFile.push_back("库存部.txt");
	for(int i = 0; i < vecDepFile.size(); i++)
	{
		Department* pDepment = NULL;
		string strCfgFile = vecDepFile[i];
		if(0 == strCfgFile.compare("销售部.txt"))
		{
			pDepment = new SellerDep(strCfgFile);
		}
		else if(0 == strCfgFile.compare("人力资源部.txt"))
		{
			pDepment = new HrDep(strCfgFile);		
		}
		else if(0 == strCfgFile.compare("库存部.txt"))
		{
			pDepment = new StockDep(strCfgFile);

		}
		else
		{
			return false;

		}		
		pDepment->Load();
		m_vecDep.push_back(pDepment);
	}

	m_pStock = new Stock("库存表.txt");
	m_pStock->Load();

	//
	m_pSalesList = new SalesList("销售记录表.txt");
	m_pSalesList->Load();
	return true;

}

Department* EntMgr::GetDepByName(string strDepName)
{
	for (int i = 0; i < m_vecDep.size(); i++)
	{
		if(0 == strDepName.compare(m_vecDep[i]->m_strDepName))
		{
			return m_vecDep[i];
		}	
	}
	return NULL;
}

void EntMgr::PrintEmp()
{
	for (int i = 0; i < m_vecDep.size(); i++)
	{
		m_vecDep[i]->PrintList();	
	}

}

bool EntMgr::DelEmp(string strNumId)
{
	for(int i = 0; i < m_vecDep.size(); i++)
	{
		if (true == m_vecDep[i]->DelEmpByNumId(strNumId))
		{
			cout << "删除" << m_vecDep[i]->m_strDepName << "部门员工" << strNumId << "成功!\n";
			return true;

		}	
	}
	return false;
}

Staff* EntMgr::GetEmp(string strNumId)
{
	for(int i = 0; i < m_vecDep.size(); i++)
	{
		Staff* pStaff = m_vecDep[i]->GetEmpByNumId(strNumId);
		if (NULL != pStaff)
		{

			return pStaff;
		}	
	}
	return NULL;
}


User::User()
{
	m_strUName = "";
	m_strPwd = "";
}

User::~User()
{

}



bool User::LoadUser()
{
	ifstream fin("data1.data");  
	string  strInfo;  
	while (getline(fin, strInfo))
	{  
		if ("" == strInfo)
		{			
			break;
		}
		Base64 *base = new Base64();		
		m_strUName = base->Decode(strInfo.c_str(), strInfo.length());
		delete base;
	}
	return true;
}

bool User::LoadPwd()
{
	ifstream fin("data2.data");  
	string  strInfo;  
	while (getline(fin, strInfo))
	{  
		if ("" == strInfo)
		{			
			break;
		}
		Base64 *base = new Base64();		
		m_strPwd = base->Decode(strInfo.c_str(), strInfo.length());
		delete base;
	}
	return true;
}

bool User::ChangePwd()
{
	string strNewPwd;
	string strNewPwd1;
	cin >> strNewPwd;
	if (strNewPwd == m_strPwd)
	{
		cout << "不能与新密码一致!" << endl;	
		return false;
	}
	cout << "再次确认新密码:" << endl;
	cin >> strNewPwd1;

	if (strNewPwd1 != strNewPwd)
	{
		cout << "2次密码输入不一致!" << endl;
		return false;
	}
	m_strPwd = strNewPwd1;

	ofstream fout("data2.data"); 

	Base64 *base = new Base64();
	string strInfo;
	strInfo = base->Encode((const unsigned char *)m_strPwd.c_str(), m_strPwd.length());
	delete base;
	base = NULL;
	fout << strInfo << endl;
}
