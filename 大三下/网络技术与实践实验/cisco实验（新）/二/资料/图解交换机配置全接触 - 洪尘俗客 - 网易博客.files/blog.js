/**
 * 日志模块左侧类别列表
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>添加分类</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="删除" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="编辑" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
    {/if}\
');
/**
 * 日志模块左侧归档列表
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}年</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}年</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');

/**
 * 日志模块左侧评论列表, （编辑状态）
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有评论\
    {/if}\
');    

/**
 * 日志编辑下面的评论模板
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">发布者:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="删除评论">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="删除引用">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM月dd日 HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * 日志预览模块左侧类别列表
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
  	{/if}\
');

/**
 * 日志预览模块左侧存档列表
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">发布者:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="删除评论">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="删除引用">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM月dd日 HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * 预览日志列表
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="折叠/展开日志正文">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>分类:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>标签:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">字号&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">大</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">中</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">小</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}">${b.content|default:""}</div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}次阅读</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">固定链接<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">分享</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">引用 (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">评论 (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">　${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0表示关闭，1表示打开-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="关闭">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">本文的固定不变链接:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">复制引用链接成功</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="复制引用链接">复　制</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 该分类暂无日志！\
	     {elseif loadType == "archive"}\
	      	 该归档暂无日志！\
	     {else}\
			 暂无日志！\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">标题</td><td class="g_w_15 g_t_left c09">类别</td><td class="g_w_15 c09 g_t_center">发布时间</td><td class="g_w_10 c09 g_t_center">删除</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY年 MM月dd日 HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>草稿</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>审核不通过</b>\
      			{elseif (b.valid == 26)}<br/><b>已被屏蔽，仅供本人阅读</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="删除blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>评论:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>引用:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		没有该分类的日志！\
	      {elseif loadType == "archive"}\
      			没有该归档的网络日志！\
	      {else}\
	      		暂无日志，可点击"添加日志"以添加日志内容。\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * 预览页面引用通告
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">本文引用地址:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">复制引用链接成功</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="复制引用链接" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >复　制</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="引用这篇日志" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>引　用</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">引用记录:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">引用人:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">相关圈子推荐</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
/**************************************************************
*				163 blog Blog Permalink Page				  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright：1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * 固定链接页面使用的Javascript控制代码
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 */
 
if (NEBlog==undefined){
	var NEBlog={};
}
/**
 * 全局变量, PermaLinkPage对象实例, 用于ftl页面访问
 * @type	NEBlog.PermaLinkPage
 */
NEBlog.gPermaLinkPage = null;

/**
 * 全局函数, 创建PermaLinkPage对象实例, ftl页面onload时调用
 * @param	{String}	sServerName				博主的域名
 * @param	{String}	sStyle					博客的样式和图片的地址前缀
 * @param	{String}	sBlogId					此篇blog的id
 * @param	{Number}	iHostId					博主的id
 * @param	{Number}	iCommentRange			每页显示的评论数量
 * @param	{Number}	iCommentCount			此篇博客的评论总数
 * @param	{Number}	iGlobalAllowComment		用户设置的评论全局访问权限 -100表示任何人可评论，0表示登录用户可评论，100表示不可评论，10000表示好友可评论
 * @param	{Number}	iVisitorId				访问者此篇blog的用户id
 * @param	{String}	sVisitorName			访问者的名字(网易通行证ID)
 * @param	{String}	sVisitorNickname		访问者的昵称
 * @param	{String}	sVisitorAvatar			访问者的头像地址
 * @param	{String}	sVisitorIP				访问者的IP
 * @param	{String}	sHostName				博主的hostName, 拼在blog.163前的用户名
 * @param	{String}	sHostPath				博主的hostPath
 * @param	{Number}	iVisitorRank			访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
 * @param	{String}	sBlogTitle				此篇博客标题
 * @param	{String}	sBlogPermalink			博客的静态链接地址, 如: blog/static/66779620070561956531
 * @param	{Number}	iSrl					静态链接后面的唯一的数字串, 如66779620070561956531		
 * @param	{String}	sDivComShowId			页面显示的评论列表显示区的div的id
 * @param	{String}	sDivComPubId			页面显示的评论发布区div的id
 * @param	{String}	sCircleBaseUrl			圈子的serverName
 * @param	{String}	sTestOn					是否进行测试, on或者off
 */
function gLoadPermaLink(sServerName,sStyle, sBlogId, iHostId, iCommentRange, iCommentCount, iGlobalAllowComment, 
							iVisitorId, sVisitorName, sVisitorNickname, sVisitorAvatar, sVisitorIP, sHostName, 
							sHostPath, iVisitorRank, sBlogTitle, sBlogPermalink, iSrl,  
							sDivComShowId, sDivComPubId, sCircleBaseUrl, sTestOn) 
{
//	htmleditor = new NECtrl.HtmlEditor(sBlogId, "com_" + sBlogId, {
//					iWidth: 0, iHeight: 350, sObjName: "htmleditor", iMaxLen: 1000});
	//调用NEBlog.PermaLinkPage的构造函数
	NEBlog.gPermaLinkPage = new NEBlog.PermaLinkPage('NEBlog.gPermaLinkPage',
							{sServerName:sServerName, sStyle:sStyle, sBlogId:sBlogId, iHostId:iHostId,
							iCommentRange:iCommentRange, iCommentCount:iCommentCount, 
							iGlobalAllowComment:iGlobalAllowComment, iVisitorId: iVisitorId,
							sVisitorName:sVisitorName, sVisitorNickname:sVisitorNickname, 
							sVisitorAvatar:sVisitorAvatar, sVisitorIP:sVisitorIP, sHostName:sHostName,
							sHostPath:sHostPath, iVisitorRank:iVisitorRank, sBlogTitle:sBlogTitle,
							sBlogPermalink:sBlogPermalink, iSrl:iSrl, 
							sDivComShowId:sDivComShowId, sDivComPubId:sDivComPubId, sCircleBaseUrl:sCircleBaseUrl, 
							sTestOn:sTestOn});
}

/**
 * NEBlog.PermaLinkPage Class
 *
 * @class 固定链接页面对象
 */
NEBlog.PermaLinkPage = Class.create();


/**
 * 全局变量，单例，TrimPath模版parse后的对象
 * 用于显示日志的评论列表
 * @type	Object
 */
NEBlog.PermaLinkPage.trackbacksTemplate = null;

/**
 * 全局变量，单例，TrimPath模版parse后的对象
 * 用于显示日志的相关圈子推荐
 * @type	Object
 */
NEBlog.PermaLinkPage.relateBlogCircleTemplate = null;


NEBlog.PermaLinkPage.prototype = {
	/**
	 * PermaLinkPage类构造函数 初始化PermaLinkPage对象并预设参数
	 * @constructor
	 * @param 	{String}	sObjectName  	PermaLinkPage实例对象名字	
	 * @return 	{NEBlog.PermaLinkPage} 		PermaLinkPage对象
	 * @see 	#_init
	 */
	initialize: function(sObjectName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sServerName:			null,	// 博主的域名
			sStyle:               	null,	// 博客的样式和图片的地址前缀
			sBlogId:             	null,	// 此篇blog的id
			iHostId:           	   	null,	// 博主的id
			iCommentRange:     	   	null,	// 每页显示的评论数量	
			iCommentCount:     	   	null,	// 此篇博客的评论总数
			iGlobalAllowComment:  	null,	// 用户设置的评论全局访问权限 -100表示任何人可评论，0表示登录用户可评论，100表示不可评论，10000表示好友可评论
			iVisitorId:           	null,	// 访问者此篇blog的用户id
			sVisitorName:			null,	// 访问者的名字(网易通行证ID)
			sVisitorNickname:		null,	// 访问者的昵称
			sVisitorAvatar:			null,	// 访问者的头像地址
			sVisitorIP:				null,	// 访问者的IP
			sHostName:				null,	// 博主的hostName, 拼在blog.163前的用户名
			sHostPath:				null,	// 博主的hostPath
			iVisitorRank:			null,	// 访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
			sBlogTitle:				null,	// 此篇博客标题
			sBlogPermalink:			null,	// 博客的静态链接地址, 如: blog/static/66779620070561956531
			iSrl:					null,	// 静态链接后面的唯一的数字串, 如66779620070561956531					
			sDivComShowId:			null,	// 页面显示的评论列表显示区的div的id
			sDivComPubId:			null,	// 页面显示的评论发布区div的id
			sCircleBaseUrl:			null,	// 圈子url的serverName
			sTestOn:				'off'	// 是否进行测试, on或者off
						
		}, arguments[1]||{});
		/**
		 * PermaLinkPage实例对象名字
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * 评论最大字数
		 * @private
		 * @type	Number
		 */
		this._iCommentMaxLen = 1000;
		/**
		 * 因为blinddown有延时,需要控制正文显示和隐藏的同步状态
		 * 指示当前是否点击"显示/隐藏"按钮
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * 测试对象
		 * @private
		 * @type	Object
		 */
		this._oTester4PB = null;
		/**
		 * 因为blinddown有延时,需要控制四个blinddown窗口的打开关闭同步问题
		 * blinddown显示的一定是最后点击的那个链接对应的窗口
		 * _iGid用于控制四个窗口的打开关闭同步问题
		 * @private
		 * @type	Number
		 */
		this._iGid ;
		/**
		 * 评论对象实例
		 * @type	NetEase.CommentPublish
		 */
		this.commentPublish = null;
		/**
		 * 日志的下部工具条的展开和关闭状态
		 * 存放打开和关闭状态
		 * 该日志打开的工具条对应的Div的id
		 * @type 	Object
		 */
		this._oBlogToolsUpDown = 'openComDiv'+this._oOptions.sBlogId;
		
		this._init();
		
		return this;

	},
	/**
	 * 初始化函数, 显示评论区域
	 * @return	{Void}
	 */
	_init: function(){
//		htmleditor = new NECtrl.HtmlEditor(this._oOptions.sBlogId, "com_" + this._oOptions.sBlogId, {
//					iWidth: 0, iHeight: 350, sObjName: "htmleditor", iMaxLen: 1000});
					
		if (this._oOptions.sTestOn == 'on')
			this._oTester4PB = new NECtrl.SeleniumTester();
		else
			this._oTester4PB = null;

		// 参数NEBlog.gPermalink_Comments是在ftl中构建出来的js评论对象数组
		this._showComments(NEBlog.gPermalink_Comments, this._oOptions.sBlogId, this._oOptions.iHostId, this._oOptions.iCommentCount, 
		    				this._oOptions.iCommentRange, this._oOptions.iGlobalAllowComment, this._oOptions.iVisitorId, 
		    				this._oOptions.sVisitorName, this._oOptions.sVisitorNickname, this._oOptions.sVisitorAvatar, 
		    				this._oOptions.sHostName, this._oOptions.iVisitorRank, this._oOptions.sBlogTitle, 
		    				this._oOptions.sBlogPermalink, this._oOptions.iSrl, this._oOptions.sDivComShowId, 
		    				this._oOptions.sDivComPubId);	
		// 引用通告后加载		
		NEBlog.PermaLinkPage.trackbacksTemplate = createJSTAndParse("jst_blog_prev_track", jst_blog_prev_track);
		// 相关圈子推荐后加载
		NEBlog.PermaLinkPage.relateBlogCircleTemplate = createJSTAndParse("relateBlogCircle_jst", jst_blog_prev_related_circle);
		this._showRelateBlogCircle(this._oOptions.sBlogId);
		
	},
	/**
	 * 创建评论对象, 用于显示评论区域
	 * @private
	 * @param	{Array}		oComments				评论对象列表
	 * @param	{String}	sBlogId					此篇blog的id
	 * @param	{Number}	iHostId					博主的id
	 * @param	{Number}	iCommentCount			此篇博客的评论总数
	 * @param	{Number}	iPageRange				每页显示的评论数量
	 * @param	{Number}	iGlobalAllowComment		用户设置的评论全局访问权限 -100表示任何人可评论，0表示登录用户可评论，100表示不可评论，10000表示好友可评论
	 * @param	{Number}	iVisitorId				访问者此篇blog的用户id
	 * @param	{String}	sVisitorName			访问者的名字(网易通行证ID)
	 * @param	{String}	sVisitorNickname		访问者的昵称
	 * @param	{String}	sVisitorAvatar			访问者的头像地址
	 * @param	{String}	sHostName				博主的hostName, 拼在blog.163前的用户名
	 * @param	{Number}	iVisitorRank			访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
	 * @param	{String}	sBlogTitle				此篇博客标题
	 * @param	{String}	sBlogPermalink			博客的静态链接地址, 如: blog/static/66779620070561956531
	 * @param	{Number}	iSrl					静态链接后面的唯一的数字串, 如66779620070561956531		
	 * @param	{String}	sDivComShowId			页面显示的评论列表显示区的div的id
	 * @param	{String}	sDivComPubId			页面显示的评论发布区div的id
	 * @return	{Void}
	 */
	_showComments: function(oComments, sBlogId, iHostId, iCommentCount, iPageRange, iGlobalAllowComment, iVisitorId, sVisitorName, sVisitorNickname,
						sVisitorAvatar, sHostName, iVisitorRank, sBlogTitle, sBlogPermalink, iSrl, sDivComShowId, sDivComPubId) {
		
		$("smallfont").focus();// 先将焦点置到一个链接上，这样做是为了使打开的评论编辑器不会有输入焦点导致页面往下拖
		var _iCommentRight = iGlobalAllowComment;
		this.commentPublish = new NetEase.CommentPublish(oComments, sBlogId, iCommentCount, sDivComShowId, sDivComPubId, 
								{sStyle: this._oOptions.sStyle, bCanClose: true, 
								bHasCancelBtn: true, bNeedCheckLogin: false, bNeedCheckRight: true, 
								iAllowComment: _iCommentRight, iPageSize: iPageRange, iHostId: iHostId, sHostName: sHostName, 
								iVisitorId: iVisitorId, sVisitorName: sVisitorName, sVisitorNickname: sVisitorNickname,
								sLoginRedirect: '/'+sHostName+'/blog/static/'+iSrl,
								sVisitorAvatar: sVisitorAvatar, iVisitorRank: iVisitorRank, sVisitorIP: this._oOptions.sVisitorIP, 
								iEditorMaxLen: this._iCommentMaxLen, bSupportDeleteComment: false, 
								iInputWidth: 720, iEditorHeight: 230, fnAddComment: this.addNewComment.bind(this), 
								oAddCommentParams: {blogUserId: iHostId, blogTitle: sBlogTitle, blogPermalink: sBlogPermalink},
								fnAfterAddComment: this.afterAddComment.bind(this), oAfterAddCommentParams: {blogId: sBlogId},
								fnMoreData: this.getCommentsByPage.bind(this), fnCloseComments: this.closeComments,	fnReportBad: this.reportBad,					
								sObjName: this._sObjectName+'.commentPublish', bDefaultPubClose: false,
								bSupportDeleteComment:true,
								fnDelComment: this.delComment, oDelCommentParams:{blogId:sBlogId},
								fnAfterDelComment:this.afterDelComment, oAfterDelCommentParams:{blogId:sBlogId},
								fnCloseCommentDiv: this.closeCssTabBarAll.bind(this)});	
		if (this._oTester4PB != null) {
			if (oComments == null || oComments.length == 0) {
				this._test4PB("Com", "null"); 
			} else {
				var _aComId = oComments.pluck("id");
				this._test4PB("Com", _aComId);
			}
		}
		
	},

	/**
	 * dwr调用, 向服务端添加评论
	 * @param	{Object}	oNewComment			评论对象
	 * @param	{Object}	oParams				参数对象
	 * @param	{Object}	fnPostAddComment	评论添加后的动作函数
	 * @return	{Void}
	 */
 	addNewComment: function(oNewComment, oParams, fnPostAddComment) {
		//格式化评论区域返回的对象
		oNewComment.blogId = oNewComment.parentId;
		oNewComment.blogUserId = oParams.blogUserId;
		var _iFilterType = 0;
		var _oDivValcode = $("valcode"+oNewComment.parentId);
		var _iValcode;
		if (_oDivValcode != null)
			_iValcode = _oDivValcode.value;
		else
			_iValcode = -1;
		if (this._oOptions.iVisitorRank < Const.Rank.Friend) {
			var _bMatch = checkOtherSiteUrl(oNewComment.content);
			if (_bMatch) {
				alert(Local.Message.Blog[0]);
				fnPostAddComment(null);
				return false;
			}
		}
		BlogBean.addComment(oNewComment, _iFilterType, _iValcode, {
			  callback:function(oDataFromServer) {
			    fnPostAddComment(oDataFromServer);
			  },
			  errorHandler:function(ex) {
			  	//验证码错误提示
			  	if (captchaWarning(ex, "$$_comsubmithint" + oNewComment.blogId)) {
			  		fnPostAddComment(null);
			  		return false;
			  	}
			  	//关键字过滤提示
			  	var _iFilterType = filterWarning(ex);
			  	if (_iFilterType == -1) {
			  		fnPostAddComment(null);
			  		return false;
			  	}		  		  	
			  	fnPostAddComment(null);	
			  }
			});	
	},
	/**
	 * 添加评论后, 更新评论计数
	 * dwr调用, 向服务端添加评论
	 * @param	{Object}	oNewComment			评论对象
	 * @param	{Object}	oParams				参数对象
	 * @return	{Void}
	 */
	afterAddComment: function(oNewComment, oParams) {
		//增加评论数
		var _oComCount = $("comCount_" + oParams.blogId);
		if (_oComCount != null) {
			var count = _oComCount.innerHTML;
			_oComCount.innerHTML = parseInt(count) + 1;
		}
		new Effect.ScrollTo("openComDiv"+oParams.blogId, {duration:0.0});	
	},
	/**
	 * 根据页码获取评论对象
	 * @param	{String}	sBlogId				blog的id
	 * @param	{Number}	iLimit				从后台取的评论条数
	 * @param	{Number}	iOffset				从第几条评论开始取
	 * @param	{Object}	fnPostPageComment	取得评论后的后续操作, 如页面上显示等
	 */
	getCommentsByPage: function(sBlogId, iLimit, iOffset, fnPostPageComment) {
		BlogBean.getComments(sBlogId, iLimit, iOffset, {
			  callback:function(oDataFromServer) {
			    fnPostPageComment(oDataFromServer);
			    
			    if (this._oTester4PB != null) {
			    	if (oDataFromServer == null || oDataFromServer.length == 0) {
			    		this._test4PB("Com", "null");
			    	} else {
						var _aComId = oDataFromServer.pluck("id");
						this._test4PB("Com", _aComId);
			    	}
				}			
			  }
			});	
	},

	/**
	 * 打开评论区块
	 * @param	{String}	sBlogId				blog的id
	 * @param	{Number}	iCommentCount		评论总数
	 * @param	{Number}	iAllowComment		评论权限
	 * @param	{String}	sBlogTitle			blog标题
	 * @param	{String}	sBlogPermalink		blog的固定链接地址
	 */
	openComments: function (sBlogId, iCommentCount, iAllowComment, sBlogTitle, sBlogPermalink) {
		if ($('openCom_' + sBlogId).value == 2) {//数据尚未生成
		  	$('openCom_' + sBlogId).value = 0; // 表示数据已经生成
		  	// 参数NEBlog.gPermalink_Comments是在ftl中构建出来的js评论对象数组
		    this._showComments(NEBlog.gPermalink_Comments, sBlogId, this._oOptions.iHostId, iCommentCount, this._oOptions.iCommentRange, 
		    			this._oOptions.iGlobalAllowComment, iAllowComment, this._oOptions.iVisitorId, 
		    			this._oOptions.sVisitorName, this._oOptions.sVisitorNickname, this._oOptions.sVisitorAvatar, 
		    			this._oOptions.sHostName, this._oOptions.iVisitorRank, sBlogTitle, sBlogPermalink, 
		    			"comShow_" + sBlogId, "comPub_" + sBlogId);						
		}
		else {  // 数据已经生成过了, 直接显示即可
			this._upDownComments(sBlogId, null);	
		}	
	},

	/**
	 * 展开和关闭评论
	 * @private
	 * @param	{String}	sBlogId		blog的id
	 * @param	{Object}	fnInit		初始化函数	
	 * @return	{Void}
	 */
	_upDownComments: function(sBlogId, fnInit) {
		if ($('openCom_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSuccess = {success: false};
			this._iGid = 2;
			new Effect.BlindDown(
				'com_' + sBlogId, 
				{
					stateId:  sBlogId + "_$$S$$", 
					succObj:  _oSuccess, 
					duration: 0.5, 
					userCallBack: function(){
//						if (this._iGid != 2) 
//							this.closeComments(sBlogId); 
//						if(fnInit != null) 
//							fnInit();
					}.bind(this) 
				}
			);

			if (_oSuccess.success) {
				$('openCom_' + sBlogId).value = 1;		
			}else
				$('openCom_' + sBlogId).value = 0;	
		} else {
			this.closeComments(sBlogId);
			
		}
	},

	/**
	 * 关闭评论
	 * @param	{String}	sBlogId		blog的id
	 * @return	{Void}
	 */
	closeComments: function(sBlogId) {
		if ($('openCom_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('com_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openCom_' + sBlogId).value = 0;	
			}else
				$('openCom_' + sBlogId).value = 1;
		}
	},
	
	/**
	 * 打开关闭blog正文部分
	 * @param	{String}	正文对应的div的id
	 * @param	{String}	打开关闭正文的箭头id
	 * @param	{String}	打开的箭头图片
	 * @param	{String}	关闭的箭头图片
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 * @see		Effect#Up
	 */
	show_hide: function(sShowId, sArrowId, sUpImg, sDownImg){
		//已经点击过按钮, 因为显示特效的延时,还没显示完.
		if (this._bShowHiding == true)
			return;
		var _oShow = $(sShowId);		
		if(_oShow.style.display=="none") {
			if (sArrowId != null)
				if (sUpImg == null)
					$(sArrowId).src = this._oOptions.sStyle + "/ico_up.gif";
				else
					$(sArrowId).src = this._oOptions.sStyle + "/" + sUpImg;
			this._bShowHiding = true;
			Effect.BlindDown(sShowId,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}else {
	  		if (sArrowId != null)
	  			if (sDownImg == null)
					$(sArrowId).src = this._oOptions.sStyle + "/ico_down.gif";
				else
					$(sArrowId).src = this._oOptions.sStyle + "/" + sDownImg;
			this._bShowHiding = true;
	  		Effect.BlindUp(sShowId,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
	  	}
	},


	/**
	 * 相关日志推荐，相关圈子推荐
	 * @param	{String}	sBlogId			日志id
	 * @return	{Void}		
	 */
	_showRelateBlogCircle: function(sBlogId){
		if(sBlogId == null) // 当前未打开日志
			return;
		/* for test purpose
		var _oList = [
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}},
						{blogTitle:"标题23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"呃呃呃呃444444444444444444444444444444444444444444444444444444444",circle:{name:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"}},
						{blogTitle:"dddddd444444444444444444444444444444444444444444444444444444444444444444444444444ddd",circle:{name:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"}}],
						[{blogTitle:"11111111111111111",circle:{name:"ee"}},{blogTitle:"我爱你中国",circle:{name:"ee"}},
						],[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"反反复复反反复复反反复复反反复复反反复复凤飞飞"}},
						{blogTitle:"标题23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"反反复复反反复复反反复复反反复复反反复复凤飞飞"}},
						{blogTitle:"标题23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"反反复复反反复复反反复复反反复复反反复复凤飞飞"}},
						{blogTitle:"标题23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}]
					];
		var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};		
		var _sResult = NEBlog.PermaLinkPage.relateBlogCircleTemplate.process(_oData);

		$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
		*/
		BlogBean.getRelateBlogsCircles(sBlogId, this._oOptions.iHostId, {
			callback: function(oDataFromServer) {
				var _oList = oDataFromServer;
				var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};
				
				var _sResult = NEBlog.PermaLinkPage.relateBlogCircleTemplate.process(_oData);
				if(_sResult == ""){
					$("relateBlogCircle_"+sBlogId).style.display = "none";
				}else{
					$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
				}
			}.bind(this)
		});
	},
	
	/**
	 * 打开固定链接
	 * @param	{String}	sBlogId		blog id
	 * @param	{String}	sPermalink	blog链接地址
	 * @return	{Void}
	 * @see		#closePermalink
	 */
	openPermalink :function(sBlogId, sPermalink) {
		if ($('openPerma_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSuccess = {success: false};
			this._iGid = 1;
			new Effect.BlindDown('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess , duration:0.5, 
								userCallBack: function() {
									if (this._iGid != 1) 
										this.closePermalink(sBlogId);
								}.bind(this) 
			});
			
			if (_oSuccess.success) {
				$('openPerma_' + sBlogId).value = 1;	
			}else
				$('openPerma_' + sBlogId).value = 0;				
			
		} else {
			this.closePermalink(sBlogId);
		}
	},
	/**
	 * 关闭固定链接显示
	 * @param	{String}	sBlogId		blog id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closePermalink :function(sBlogId) {
		if ($('openPerma_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openPerma_' + sBlogId).value = 0;	
			}
			else
				$('openPerma_' + sBlogId).value = 1;
		}
	},

	/**
	 * 打开引用通告
	 * @param	{String}	sBlogId			blog id
	 * @param	{String}	sTrackbackUrl	引用通告地址
	 * @return	{Void}
	 * @see		#closeTrackbacks
	 * @see		#_closeAll
	 * @see		Effect#BlindUp
	 */
	openTrackbacks :function(sBlogId, sTrackbackUrl) {		
		if ($('openTrack_' + sBlogId).value == 2) {//数据尚未生成	
			BlogBean.getTrackbacks(sBlogId, {
			  callback:function(dataFromServer) {
			  	this._openTrackbacksCB(dataFromServer, sTrackbackUrl, sBlogId);
			  }.bind(this)
			});
		}else {
			if ($('openTrack_' + sBlogId).value == 0) { //数据已经生成
				this._closeAll(sBlogId);	
				var _oSuccess = {success: false};
				this._iGid = 3;
				new Effect.BlindDown('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 3) 
							this.closeTrackbacks(sBlogId);
						}.bind(this)
				});
				
				if (_oSuccess.success) {
					$('openTrack_' + sBlogId).value = 1;				
				}else
					$('openTrack_' + sBlogId).value = 0;				
			} else {
				this.closeTrackbacks(sBlogId);
			}
		}	
	},
	/**
	 * 从服务端获取blog的引用通告后的回调函数，为模板插入数据
	 * @param	{Object}	oTrackbacks		引用通告对象数组
	 * @param	{String}	sTrackbackUrl	引用通告地址
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		#openTrackbacks
	 * @see		#_test4PB
	 * @see		Trimpath
	 */
	_openTrackbacksCB :function(oTrackbacks, sTrackbackUrl, sBlogId) {
		var _oData = {tbs: oTrackbacks, tbUrl: sTrackbackUrl, blogId: sBlogId, hostName: this._oOptions.sHostName,
					  style: this._oOptions.sStyle, objName: this._sObjectName, visitorName: this._oOptions.sVisitorName, hostId: this._oOptions.iHostId};
		var _sResult = NEBlog.PermaLinkPage.trackbacksTemplate.process(_oData);
		$("track_" + sBlogId).innerHTML = _sResult;
		$('openTrack_' + sBlogId).value = 0;
		this.openTrackbacks(sBlogId, sTrackbackUrl);
		
		if (this._oTester4PB != null) {
			if (oTrackbacks == null || oTrackbacks.length == 0) {
				this._test4PB("Tb", "null");
			} else {
				var _aTbId = trackbacks.pluck("id");
				this._test4PB("Tb", _aTbId);
			}
		}	
	},

	/**
	 * 关闭引用通告
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closeTrackbacks :function(sBlogId) {
		if ($('openTrack_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openTrack_' + sBlogId).value = 0;	
			}else
				$('openTrack_' + sBlogId).value = 1;
		}
	},

	/**
	 * 如果固定链接、评论和引用通告3个页面有打开的，则关闭它
	 * @private
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		#closeComments
	 * @see		#closeTrackbacks
	 */
	_closeAll :function(sBlogId) {
		if ($('perma_' + sBlogId) != null &&
			$('openPerma_' + sBlogId).value == 1) {
			this.closePermalink(sBlogId);
		}
		else if ($('com_' + sBlogId) != null &&
			$('openCom_' + sBlogId).value == 1) {
			this.closeComments(sBlogId);
		} 
		else if ($('track_' + sBlogId) != null &&
			$('openTrack_' + sBlogId).value == 1) {
			this.closeTrackbacks(sBlogId);
		}
	},

	/**
	 * 转到tag页面
	 * @param	{Object}	oTag		tag对象
	 * @param	{String}	sHostName	域名地址
	 * @return	{Void}
	 */
	searchTagObj :function(oTag, sHostName) {
		BlogBean.getHostAllTags({
		  callback:function(tags) {
		  	g_userTagList =  tags;
		    this._searchTagObjCB(oTag,sHostName);
		  }.bind(this)
		});	
		return false;
	},
	/**
	 * 查询tag所对应的跳转地址并跳转
	 * @param	{Object}	oTag		tag对象
	 * @param	{String}	sHostName	域名地址
	 * @return	{Boolean}	
	 * @see		#getTagObjByTagname
	 */
	_searchTagObjCB :function(oTag, sHostName) {
		
		var _oTag = getTagObjByTagname(oTag, -1, g_userTagList);
		if(_oTag==null)
			return false;
		//都改成全局搜索，by mml
		window.open("http://blog.163.com/search/?t=tag&q=" + encodeURIComponent(_oTag.tagName) + "&o=blog");
					
		//location.href = "prevTag.do?host=" + sHostName + "&isGlobal=false&type=3&tagId=" + _oTag.id;
		return false;
	},
	/**
	 * 测试
	 * @private
	 * @param	{String}	sKey		测试对象的键
	 * @param	{String}	vValues		测试对象的值
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PB: function(sKey, vValues, sRelValue) {
		if (this._oTester4PB == null)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4PB.setSingle("Blog", vValues);
				break;
			case "Com":
				this._oTester4PB.setArray("Com", vValues);
				break;
			case "Tb":
				this._oTester4PB.setArray("Tb", vValues);
				break;
		}	
	},
	/**
	 * 举报评论
	 */
	reportBad:	function(report, postReportFunc) {
		PreUserReportBean.addUserReport(report, postReportFunc); 
	},
	
	
	/**
	 * 显示分享div add by gw
	 */	
	showShareDiv:function(aId ,permalink, title){
		var url = 'http://' + UD.hostName + '.blog.163.com/' + permalink;
		if(jsWindowManager == null)
			jsWindowManager = new NetEase.JSWindowManager();
		if(g_shareDiv == null){				  		
			g_shareDiv = new NetEase.ShareByEmail({aId:aId, jsWindowManager:jsWindowManager, visitorName:UD.visitorName,type:'blog', url:url,title:title}); 
	    }else{
	    	g_shareDiv.refreshNew({aId:aId, type:'blog', url:url,title:title});
	    }
	},
	
	upDownCssTabBar: function (sDivId){	
		var _sOpenedDivId = this._oBlogToolsUpDown;
		if(_sOpenedDivId==undefined || _sOpenedDivId==null || _sOpenedDivId=="") {
			//没有被展开过, 展开点击的Div
			Element.addClassName(sDivId,"s");
			this._oBlogToolsUpDown = sDivId;
			Element.addClassName('blogCssTabBar',"bd1b");
		}else if(_sOpenedDivId == sDivId){
			//点击已经展开的Div
			Element.removeClassName(_sOpenedDivId,"s");
			this._oBlogToolsUpDown = "";
			Element.removeClassName('blogCssTabBar',"bd1b");
		}else{
			//本tools已有展开的条目, 先展开同一tools中的另一条目
			Element.removeClassName(_sOpenedDivId,"s");
			Element.addClassName(sDivId,"s");
			this._oBlogToolsUpDown = sDivId;
		}
	},
	
	closeCssTabBarAll: function(sBlogId){
		this._oBlogToolsUpDown = "";
		Element.removeClassName('openComDiv' + sBlogId,"s");
		Element.removeClassName('openTbDiv' + sBlogId,"s");
		Element.removeClassName('openPermaDiv' + sBlogId,"s");
		Element.removeClassName('blogCssTabBar',"bd1b");
	},
	
	delComment: function(sCommentId, oParams, fnPostDelComment){
		BlogBean.deleteComment(sCommentId, oParams.blogId, {
			  callback:function(oDataFromServer) {
			    fnPostDelComment(oDataFromServer);
			  }
			});
	},
	
	afterDelComment: function(oParams){
		$("comCount_" + oParams.blogId).innerHTML = parseInt($("comCount_" + oParams.blogId).innerHTML)-1;
	}
}

var recentNumber = 5;
var serverName;
var gRecentComments;
var gStatusElemId;
function clickTBUrl(urlElemId, statusElemId) {
	if(copyText(urlElemId)){
		document.getElementById(statusElemId).style.display='inline';
		gStatusElemId = statusElemId;
		window.setTimeout(fadeStatus, 5000);
	}
}

function fadeStatus() {
	document.getElementById(gStatusElemId).style.display='none';
}

/*************************************************字号*************************************************/
function changeFont(sElemId, size) {
	if (size == 1) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		Element.addClassName(sElemId, "g_t_large");
	}else if (size == 2) {
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
		Element.addClassName(sElemId, "g_t_midle");
	}else if (size == 3) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
	}
}
var CircleConst ={
	
	CIRCLE_PRIV_ADMIN:1, //圈子管理员
	CIRCLE_PRIV_NORMAL:2, //普通用户
	//新会员的相关常数
	CIRCLE_PRIV_NEW: 3,//新会员
	IS_IN_NEW_PERIOD:1000*60*60*24*7,//暂时设为一周之内加入的为新会员
	
	CIRCLE_STATUS_APPLIED:1, //圈子状态--已申请
	CIRCLE_STATUS_REJECTED:2, //圈子状态--被拒绝
	CIRCLE_STATUS_SUCCESS:3, //圈子状态--已申请成功
	
    CIRCLEUSER_STATUS_APPLIED:1, //圈子用户状态--已申请
	CIRCLEUSER_STATUS_REJECTED:2, //圈子用户状态--被拒绝
	CIRCLEUSER_STATUS_SUCCESS:3, //圈子用户状态--已申请成功
	CIRCLEUSER_STATUS_SECONDAPPLIED:4,//圈子用户状态--第二次再申请
	CIRCLEUSER_STATUS_SECONDREJECT:5,//圈子用户状态--第二次被拒绝，不能申请了
	
	
    CIRCLEBLOG_STATUS_APPLIED:1, //圈子日志状态--已推送
	CIRCLEBLOG_STATUS_REJECTED:2, //圈子日志状态--被拒绝
	CIRCLEBLOG_STATUS_SUCCESS:3, //圈子日志状态--已申请成功


	CIRCLE_MODULE_CIRCLEINFO:1, //显示圈子信息的模块
	CIRCLE_MODULE_NEW_ARTICLES:2, //显示最新blog的首页模块
	CIRCLE_MODULE_HOT_ARTICLES:3, //显示最热blog的首页模块,按访问量排序
	CIRCLE_MODULE_RECOMMEND_ARTICLES:4, //显示推荐blog的首页模块,按访问量排序
	CIRCLE_MODULE_HOT_MEMBERS:5, //显示圈子最热门的圈友, 按访问量排序
	CIRCLE_MODULE_ACTIVE_MEMBERS:6, //显示圈子最活跃的圈友, 按日志数排序
	CIRCLE_MODULE_RED_MEMBERS:7, //推荐圈友(或所谓的红人)
	CIRCLE_MODULE_NEW_MEMBERS:8, //新加入的圈友
	CIRCLE_MODULE_VISITSTAT:9, //访问统计
	CIRCLE_MODULE_BULLETIN:10, //圈子公告
	CIRCLE_MODULE_CUSTOMHTML_ADD:11, //自定义HTML
	CIRCLE_MODULE_CREATOR:13,//圈主的信息模块
	
	CIRCLE_MODULE_BLOG_COLUMN:1000, //blog专栏
	
	CIRCLE_MODULE_CUSTOM:10000, //自定义模块
	CIRCLE_MODULE_CUSTOMLIST:10001, //自定义列表模块
	CIRCLE_MODULE_CUSTOMHTML:10002, //自定义HTML模块
	
	CIRCLEBLOG_DEFAULT_BLOGNUM:10,//默认取的BLOG个数

    CIRCLE_MEMBER_PAGE_RANGE: 20, //每页显示的圈友数
    CIRCLE_BLOG_PAGE_RANGE: 20, //每页显示的日志数
    CIRCLE_BLOG_PREV_PAGE_RANGE: 20, //预览时每页显示的日志数
    CIRCLE_MEMBER_PREV_PAGE_RANGE: 20, //预览时每页显示的日志数

    CIRCLE_MAP_PAGE_RANGE: 50, //圈子地图每页显示的圈子数
    
    BLOGS_SHOW_SIZE: 300, //在查看最新、热门等的blog的显示条数
    MEMBERS_SHOW_SIZE: 300, //在查看最新、热门等的会员的显示条数

	//圈子加入的状态
	CIRCLE_JOIN_SUCCESS:1,//成功
	CIRCLE_JOIN_ALREADY_MEMBER:2,//已经是圈友了
	
	CIRCLE_KIND_PUBLIC:1,//公开
	CIRCLE_KIND_PRIVATE:2,//私密圈子

	BLOG_RSS: 1,
	RESOURCELIST_RSS: 2,
	
	RANK_OWNER: 10000,
	RANK_ADMIN: 100,
	RANK_GUEST: 0,
	RANK_ANONYMOUS: -100,
	RANK_NESUSER: -90,
	RANK_UNKNOWN: 999999,

	//圈子设置的一些默认值
	DEFAULT_COLOR : "-1",
    DEFAULT_FONT : "宋体",
    DEFAULT_ALLOW_COMMENT : false,
    DEFAULT_BORDER_STYLE : 0,
    DEFAULT_BORDER_WIDTH : 1,
    DEFAULT_PIC_REPEAT : 0,
    DEFAULT_PIC_POS : 0,
	
	//几张图片的默认地址，这里跟CircleConst.java里面的不太一样，因为这里是
	//经过aop处理，增加了前缀和后缀的；而CircleConst层多用于dao层，所以简短些
	NO_LOGO_PIC:"/photo/-4000.jpg",
	NO_BIG_PIC:"/photo/-3000.jpg",
	NO_BACK_PIC:"/photo/-2000.jpg",
	NO_LINK_PIC:"/photo/-5000.jpg"
	
}

var BlogsUtil={
    getBlogRankHtml: function(rank){
        var rankHtml="";
        for (var i=0;i<rank;i++){
            rankHtml+="<img src='/style/common/icn_star.gif'/>";
        }
        for (var i=rank;i<5;i++){
            rankHtml+="<img src='/style/common/icn_star_grey.gif'/>";
        }
        return rankHtml;
    },
    getBlogRankUpdateHtml: function(circleId, blogId, rank){
        var rankHtml="";
        for (var i=0;i<rank;i++){
        	var curRank=i+1;
            rankHtml+="<img id='rank"+curRank+"' onclick='RankAdaptor.changeRank("+circleId+","+blogId+","+curRank+")' style='cursor:pointer' src='/style/common/icn_star.gif'/>";
        }
        for (var i=rank;i<5;i++){
        	var curRank=i+1;
            rankHtml+="<img id='rank"+curRank+"' onclick='RankAdaptor.changeRank("+circleId+","+blogId+","+curRank+")' style='cursor:pointer' src='/style/common/icn_star_grey.gif'/>";
        }
        return rankHtml;
    }
}

var CircleUtil={
    circlePrivs: [
        {id: CircleConst.CIRCLE_PRIV_ADMIN, name:"管理员"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"普通圈友"}
    ],
    circleKinds: [
        {id: CircleConst.CIRCLE_KIND_PUBLIC, name:"公开"},
        {id: CircleConst.CIRCLE_KIND_PRIVATE, name:"私密"}
    ],
    circlePrivImgs: [
        {id: CircleConst.CIRCLE_PRIV_ADMIN, name:"<img src='/style/common/icn_boss.gif' title='管理员'/>"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"<img src='/style/common/icn_member.gif' title='普通圈友'/>"}
    ],
    circlePrivImgsInOne: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"<img src='/style/common/icn_boss.gif' title='管理员' />"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"<img src='/style/common/icn_bosspop.gif' title='管理员 推荐' />"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"<img src='/style/common/icn_member.gif' title='普通圈友'/>"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"<img src='/style/common/icn_memberpop.gif' title='普通圈友 推荐'/>"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"<img src='/style/common/icn_newman.gif' title='新圈友' />"}
    ],
    circlePrivImgsInBG: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"m8",hint:"管理员"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"m8",hint:"管理员 推荐"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"m7b",hint:"普通圈友"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"m7b",hint:"普通圈友 推荐"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"m7b",hint:"新圈友"}
    ],
    circlePrivHint: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"管理员"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"管理员 推荐"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"普通圈友"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"普通圈友 推荐"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"新圈友"}
    ],
    circleUserStatus: [
        {id: CircleConst.CIRCLEUSER_STATUS_APPLIED, name:"正在申请"},
        {id: CircleConst.CIRCLEUSER_STATUS_REJECTED, name:"被拒绝"},
        {id: CircleConst.CIRCLEUSER_STATUS_SUCCESS, name:"申请成功"},
        {id: CircleConst.CIRCLEUSER_STATUS_SECONDAPPLIED, name:"再次申请"},
        {id: CircleConst.CIRCLEUSER_STATUS_SECONDREJECT, name:"再次被拒"}
    ],
    blogStatus: [
        {id: CircleConst.CIRCLEBLOG_STATUS_APPLIED, name:"未审核"},
        {id: CircleConst.CIRCLEBLOG_STATUS_REJECTED, name:"被拒绝"},
        {id: CircleConst.CIRCLEBLOG_STATUS_SUCCESS, name:"推送成功"}
    ],
    blogRanks: [
        {id: 0, name:BlogsUtil.getBlogRankHtml(0)},
        {id: 1, name:BlogsUtil.getBlogRankHtml(1)},
        {id: 2, name:BlogsUtil.getBlogRankHtml(2)},
        {id: 3, name:BlogsUtil.getBlogRankHtml(3)},
        {id: 4, name:BlogsUtil.getBlogRankHtml(4)},
        {id: 5, name:BlogsUtil.getBlogRankHtml(5)}
    ],
    getCircleKindStr: function(circleKindId){
    	return IdToName.convert(circleKindId, CircleUtil.circleKinds);
    },
    getUserPrivName: function(privilege){
    	return IdToName.convert(privilege, CircleUtil.circlePrivs);
    },
    getUserPrivImg: function(privilege){
    	return IdToName.convert(privilege, CircleUtil.circlePrivImgs);
    },
    getUserPrivImgInOne: function(privilege, inRedList, joinDate){
    	var red;
    	if(inRedList)
            red=new Number(10);
    	else 
            red=new Number(0);
    	var newPriv=new Number(privilege)+red;
    	//if(newPriv==CircleConst.CIRCLE_PRIV_NORMAL){
    	//如果这个圈友既不是管理员也不是推荐的，那么就是普通圈友。这个时候再
    	//查看是不是新加的圈友，是新加的圈友则将newPriv设为“新圈友”对应的id
    	//也就是说，管理员、推荐圈友的图标是优先于新圈友的图标的
    	//	var joinTime=joinDate.getTime();
    	//	var nowTime=new Date();
    	//	if(nowTime.getTime()-joinTime < CircleConst.IS_IN_NEW_PERIOD)
    	//		newPriv = CircleConst.CIRCLE_PRIV_NEW;
    	//}
    	return IdToName.convert(newPriv, CircleUtil.circlePrivImgsInBG);
    },
    getUserPrivHint: function(privilege, inRedList, joinDate){
    	var red;
    	if(inRedList)red=new Number(10);
    	else red=new Number(0);
    	var newPriv=new Number(privilege)+red;
    	return IdToName.convert(newPriv, CircleUtil.circlePrivHint);
    },
    getBlogStatus: function(status){
    	return IdToName.convert(status, CircleUtil.blogStatus);
   },
    getBlogRankHtml: function(rank){
    	return IdToName.convert(rank, CircleUtil.blogRanks);
   },
   getBlogRankUpdateHtml: function(circleId, blogId, rankId){
   		return BlogsUtil.getBlogRankUpdateHtml(circleId, blogId, rankId);	
   },
   getUserStatus: function(status){
    	return IdToName.convert(status, CircleUtil.circleUserStatus);
   },
   getColumn: function(columnId){
    	return IdToName.convert(columnId, CircleUtil.circleColumns);
   }
}

var SpaceInfo={
    init: function(spaceBaseUrl){
        SpaceInfo.baseUrl=spaceBaseUrl;
    }
}

var CirclePageTitle={
    set: function(title){
        $("titletext").innerHTML=title;
    }
}

var CircleInfo={
    baseUrl: "http://q.163.com",
   init: function(circleId, style,  callback){
        CircleInfo.circleId=circleId;
        CircleInfo.style=style;
        CircleBean.getCircleColumns(circleId, function(circleColumns){
            CircleInfo.circleColumns=circleColumns;
            if (callback!=null){
                callback();
            }
        });
   },
   getColumn: function(columnId){
        var circleColumn=CircleInfo.circleColumns.find( function(curColumn){
           return curColumn.id==columnId; 
        });
        if (null==circleColumn){
        	alert("error columnId: "+columnId);
        	return "";
        }
        return circleColumn;
   },
   getColumnByName: function(columnName){
        var circleColumn=CircleInfo.circleColumns.find( function(curColumn){
           return curColumn.name==columnName; 
        });
        return circleColumn;
   },
    getCircleBlogLink: function(circleUrlName, userName, permalink){
        var permaPrefix="blog/static/";
        if (permalink.indexOf(userName+"/"+permaPrefix)==0){
            permaPrefix=userName+"/"+permaPrefix;
        }
        var permaPrefixLength=permaPrefix.length;
        var permaSerial=permalink.substring(permaPrefixLength);
        return CircleInfo.baseUrl+"/"+circleUrlName+"/blog/"+userName+"/"+permaSerial;
    }
}

var CircleBlogPushInfo={
    notPushedCircles: [],
    init: function(blogId, profileId){
        CircleBlogPushInfo.blogId=blogId;
        CircleBlogPushInfo.profileId=profileId;
    },
    addNotPushedCircle: function(circle){
        CircleBlogPushInfo.notPushedCircles.push(circle);
    },
    getCirclesByType1: function(type1Id){
        var circles=CircleBlogPushInfo.notPushedCircles.findAll( function(curCircle){
            return curCircle.circleType1Id==type1Id;
        });
        return circles;
    },
    getPrefferdType1Id: function(){
    }
}

/**
 * 日志模块左侧类别列表
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>添加分类</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="删除" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="编辑" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
    {/if}\
');
/**
 * 日志模块左侧归档列表
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}年</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}年</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');

/**
 * 日志模块左侧评论列表, （编辑状态）
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有评论\
    {/if}\
');    

/**
 * 日志编辑下面的评论模板
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">发布者:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="删除评论">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="删除引用">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM月dd日 HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * 日志预览模块左侧类别列表
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
  	{/if}\
');

/**
 * 日志预览模块左侧存档列表
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">发布者:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="删除评论">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="删除引用">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM月dd日 HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * 预览日志列表
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="折叠/展开日志正文">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>分类:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>标签:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">字号&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">大</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">中</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">小</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}"></div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}次阅读</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">固定链接<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">分享</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">引用 (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">评论 (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">　${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0表示关闭，1表示打开-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="关闭">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">本文的固定不变链接:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">复制引用链接成功</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="复制引用链接">复　制</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 该分类暂无日志！\
	     {elseif loadType == "archive"}\
	      	 该归档暂无日志！\
	     {else}\
			 暂无日志！\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">标题</td><td class="g_w_15 g_t_left c09">类别</td><td class="g_w_15 c09 g_t_center">发布时间</td><td class="g_w_10 c09 g_t_center">删除</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY年 MM月dd日 HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>草稿</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>审核不通过</b>\
      			{elseif (b.valid == 26)}<br/><b>已被屏蔽，仅供本人阅读</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="删除blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>评论:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>引用:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		没有该分类的日志！\
	      {elseif loadType == "archive"}\
      			没有该归档的网络日志！\
	      {else}\
	      		暂无日志，可点击"添加日志"以添加日志内容。\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * 预览页面引用通告
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">本文引用地址:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">复制引用链接成功</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="复制引用链接" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >复　制</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="引用这篇日志" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>引　用</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">引用记录:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">引用人:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">相关圈子推荐</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
//调用者必须定义g_userTagList全局用户标签库数组，并从ssesion中取userTagList变量值
//添加tag时才导入。元素为Tag对象。保证tag唯一性全局数组
//var g_userTagList = new Array();
//var userTagLoaded = false;

var recomTagArr = ["美女", "Web2.0", "汽车", "生活","LOVA", "朋友", "Java", "记事",    
"映像", "mood", "健身", "汽油","上海", "娱乐八卦", "Diary", "广州", "北京", "LOMO", "杂谈", "情感", "购物", "photo" ,  
"随拍", "香港", "feeling", "工作", "风景", "LOVE", "动漫", "传媒", "车展", "歌词", "随笔", "音乐", "自言自语" ,  
"Life", "明星", "IT", "摄影", "美食" , "美容", "Linux", "旅游", "自拍", "妈咪", "Movie", "宝贝", "科技", "Music", "体育",  
"世界杯", "乱七八糟", "乱弹", "人物", "人生", "闲言碎语", "学习", "小说", "心情","感悟", "技术", "收藏", "故事", "文摘",   
"新闻", "日记", "宠物", "流水帐" , "涂鸦", "消息区", "爱情", "生活", "电影","新闻资讯", "网络", "美女写真", "评论", "诗歌",   
"读书", "资料", "足球","转载", "图片", "阅读"];

// 相片的推荐标签 14 + 17 + 17 + 8 = 56
var recomPhotoTags = ["我","美女","帅哥","自拍","网友","朋友","同学","情侣","老婆","老公","家人","爱情","兄弟","头像",
"宝贝","搞笑","另类","开心","可爱","浪漫","酷","时尚","娃娃","宠物","婚纱","桌面","贴图","素材","动漫","模特","明星",
"超女","电影","韩剧","娱乐","生活","美食","逛街","汽车","体育","足球","篮球","军事","学校","星座","艺术","摄影","写真",
"绘画","旅游","风景","动物","植物","欧美","节日"];

// 推荐标签的类别名
var recomTagTabNames = ["新  闻","娱  乐","情  感","文  学","校  园","体  育","生  活","旅  游","财  经","传  媒","科  技"];

var recomTagArrs = [];
// 热门标签，使用显著颜色显示
var hotTags = ["反腐","布什","中东","朝鲜","核武","中日关系","台湾问题","安倍晋三","超女","周杰伦","贺岁片","恶搞","演唱会","潜规则",
"刘德华","梁朝伟","两性","爱情","情感世界","老婆","初恋","性爱","同居","快乐","表白","金庸","古典文学","日记","魔兽","校花","聚会","网络小说","原创作品","央视","公务员","留学","考研","NBA","奥运","火箭","瑜伽",
"中国足球","楼市","自驾游","风景","游记","驴友","攻略","股票","家庭理财","职场","外汇","投资机会","记者","人民币","博客","DIY","WEB2.0",
"笔记本","数码","互联网","病毒安全","找工作","公务员","姚明","球星","回家","汽车","按揭","美食","大自然","股票推荐","主持人","广告","外星人","航天"];

recomTagArrs[0] = ["时事","热点","医改","房改","社保","反腐","六方会谈","就业","医保","高校","教改","普京","布什",
"国际关系","伊朗","美军","中东","朝鲜","核武","APEC","公共卫生","伊拉克","公积金","WTO","艾滋病","教育体制","安倍晋三",
"大学扩招","中日关系","食品安全","台湾问题","希望工程"];

recomTagArrs[1] = ["影评","乐评","网易娱乐","章子怡","张艺谋","范冰冰","宋祖德","超女",
"何洁","恶搞","李宇春","周杰伦","蔡依林","贺岁片","颁奖","K歌","流行","歌手","假唱","抄袭","演唱会",
"唱片","专辑","CD","吴宇森","西游记","春晚","舞林大会","TVB","越狱","twins","电影","电视剧","韩剧",
"日剧","央视","相声","郭德纲","周迅","陈凯歌","凤凰台","外语片","翻唱","潜规则","导演","编剧","演员",
"原创","贾樟柯","宁浩","刘德华","综艺节目","搞笑","徐静蕾","郭敬明","韩寒","梁朝伟","南都周刊"];

recomTagArrs[2] = ["我","老婆","老公","爸爸","妈妈","长辈","朋友","初恋","情人","爱情","婚姻","离婚","生育","吻",
"心","女友","男友","性爱","情色","感动","疯狂","真情","感悟","思念","猪","随笔","恐怖","快乐","人生","幽默","分手",
"失恋","同性恋","另类","伤心","LOVE","我爱你","两性","私人日记","单身","性感","美女","帅哥","对不起","中年","同居","暗恋",
"出轨","珍惜","加油","表白","愿望","岁月"];

recomTagArrs[3] = ["茶","校园","古玩","西游记","韩寒","郭敬明","国学","木子美","安妮宝贝","畅销书","红楼梦","金庸","李清照",
"三国演义","读后感","词","悬疑","批评","研究综述","名著","学术","读书","文化","文学","随笔","日记","书评","童话","小说","古典文学","文学研究","文学理论","文学评论",
"古典诗词","现代诗歌","网络小说","武侠小说","言情小说","都市小说","玄幻小说","原创作品","80后"];

recomTagArrs[4] = ["考试","高考","兼职","教育","留学","教师","教授","考研","四级",
"六级","高校","校园","学费","自考","雅思","真题","剑桥","课堂","口语","考试技能","魔兽","才女","校花","自习","暑假","实习",
"图书馆","师姐","师兄","聚会","二手","中专","寝室","军训","情书","论文","毕业","教材","找工作","新东方","文科生","教辅",
"十佳","免检寝室","博士","公务员","中学生","大学生","研究生"];

recomTagArrs[5] = ["NBA","奥运","篮球","火箭","姚明","足球","世界杯","中国足球","鲁能","国足","女足","欧洲杯","意甲","法国队",
"英超","贝克汉姆","英格兰","罗纳尔多","尤文","曼联","罗马","国际米兰","切尔西","黄健翔","游泳","郭晶晶","田亮","网球","费德勒",
"田径","刘翔","丁俊晖","武术","瑜伽","体育评论","转会","转播","球星","球迷","亚军","冠军","胜利","失败","综合体育","健康"];

recomTagArrs[6] = ["工作","学习","互联网","休闲","游戏","购物","逛街","日用","保养","健康","公积金","手机","店铺","工资",
"数码","相机","白领","春节","回家","中医","食疗","乡情","经济学","特产","特色菜","集邮","公司","公交","赚钱","厨房","短信",
"建筑","汽车","买车","学车","保养","赛车","汽油","车模","家居","按揭","炒房","房贷","房价","楼市",
"买房","租房","家具","装修","自驾游","房地产"];

recomTagArrs[7] = ["旅游","摄影","风景","名胜","旅行","古迹","个人相片","游记","风光","驴友","美景","贴图","丽江",
"桂林","香港","大自然","帐篷","睡袋","防潮垫","西藏","登山鞋","团长","资讯","摄影","旅行社","自然","结伴","线路","出游",
"天下","攻略","装备","指南","随笔","享受","户外","乐趣","露营","登山","美食","垂钓","公社","协会","穿越","体验","天堂","攀岩",
"行走","雪山","草原","花朵","湖泊","森林","大海","高原","墨脱","探险","自行车","越野","大山","原始","山野","笨重","大背包","古道"];

recomTagArrs[8] = ["创业","贵族","东风","日产","财经","经济","贷款","管理","金融","经营","贸易","品牌","期货","股票","股市","证券","炒股",
"商务","商业","销售","银行","营销","职场","资本","理财","外汇","投资","基金","保险","大盘","个股","股改","股评","新股","保险费","企业家","人民币","信用卡","中签率","中小板","重仓股",
"会计","超支","投机","盘点","融资","李嘉诚","股东","提成","国债","按揭","股指期货","家庭理财","操盘日记","大势分析","股票推荐","投资主题","私募基金","投资机会","企业年金"];

recomTagArrs[9] = ["传媒","媒体","记者","报业","采访","编辑","央视","杂志","报纸","纸媒体","TV","财经媒体",
"传统媒体","电视台","多媒体","新闻媒体","传媒观察","主持人","CCTV","笑话","福克斯","车模","评论","平台","频道","广告","传播","普利策",
"广电","滚动新闻","电台"];

recomTagArrs[10] = ["博客","WEB2.0","创新","互联网","社区","播客","维基","IT动态","IT评论","IT随想","视频","软件",
"Vista","网络","编程","搜索","用户体验","黑客","病毒","安全","硬件","DIY","电脑",
"笔记本","电子商务","通信","3G","3C融合","IPTV","VoIP","手机上网","增值服务","知识产权","虚拟货币","月租","家用电器",
"手机","数码","电子","无线","宽带","职能","机器人","航天","宇宙","地理","人类","探索","生命科学","考古","奇闻轶事","外星人"];

var blogTagLayer = null;

var PP_PREFIX = 'p^';
var EX_PREFIX = 'e^';

//在用户已有tag中搜索
function findUserTagList(tag){
	var tagObj = getTagObjByTagname(tag, -1, g_userTagList);
	if(tagObj)
		return true;
	else
		return false;
}

//处理tag，自动添加tag到用户tag库，处理用户tag库去重
//tagInfoTemp输入输出对象, tagInfoTemp.tags的前tagInfoTemp.numJoin项为需要添加到用户库的tag
//使用方法：调用此函数获得处理后的tag，然后
//然后更新session中的userTagList指供不同页面用户tag库一致(见EditPhotoUploadAction)
function procTagsUtil(tagInfoTemp){
	
	//把逗号分隔的tag字符串去重，替换英文逗号和去首尾空格
	var	tags = processTagString(tagInfoTemp.tags);
	
	//处理前的tag数组
	var tagOldList = tags.split(",");

	//处理去重
	tagOldList = removeSameEl(tagOldList);	
	
	//处理后的tag数组
	var tagNewList = new Array();
	//需要自动添加到用户tag库的数组
	var tagJoinList = new Array(); 
	var tagNotJoinList = new Array();
	var data;
	for(data=0; data<tagOldList.length; data++){
		var tod = tagOldList[data];
		if(tod!=""){
			if(findUserTagList(tod) || tod.indexOf(PP_PREFIX) == 0 || tod.indexOf(EX_PREFIX) == 0){
				tagNotJoinList.push(tod);
			}else{
				tagJoinList.push(tod);
			}
		}
	}
	
	tagNewList = tagJoinList.concat(tagNotJoinList);
	//处理去重
	tagNewList = removeSameEl(tagNewList);
	
	//返回数据
	tagInfoTemp.numJoin = tagJoinList.length;
	tagInfoTemp.tags = tagNewList.toString().toLowerCase(); 
}

//注意：调用顺序为processTagString,processTagUtilForCb,procTagsUtil,structQuotedTag
//和服务器一样的处理方法，此方法只用来处理回调后的tag，真正的处理由服务器端完成。处理空格、双引号，去掉每个tag首尾空格
function processTagUtilForCb(tags) {	
	var strTagQuotList = new Array();
	var resultTags ="";
		
	//处理引号
	var posQuot1 = -1;
	var posQuot2 = -1;
	do{
		posQuot1 = tags.indexOf('\"', 0);
		if(posQuot1 != -1)
			posQuot2 = tags.indexOf('\"', posQuot1+1);
		if(-1!=posQuot1 && posQuot2>posQuot1){
			var strQuot = tags.substring(posQuot1+1, posQuot2);
			//处理逗号
			strQuot = strQuot.replace(/,/g, " ");			
			//去掉首尾空格
			strQuot = Trim(strQuot);
			//去掉连续空格	
			strQuot = strQuot.replace(/\s+/g, " ");		
			strTagQuotList.push(strQuot);
			tags = tags.substring(0, posQuot1) + "," + tags.substring(posQuot2+1);
		}
	}while(-1!=posQuot1 && -1!=posQuot2);
	
	//多余的引号不显示
	tags = tags.replace(/"/g, "");
	
	//处理逗号和(半、全角)空格
	tags = tags.replace(/ /g, ",").replace(/　/g,",");
	var strTagArr = tags.split(",");
	
	// 去掉空格tag，即去掉每个tag首尾空格
	strTagQuotList.each(function(str){
		if(str != ""){
			str = Trim(str);
			if(resultTags != ""){
				resultTags += ",";
			}
			resultTags += str;
		}
	});		
	
	strTagArr.each(function(str){
		if(str != ""){
			str = Trim(str);
			if(resultTags != ""){
				resultTags += ",";
			}
			resultTags += str;
		}
	});		
	
	//处理去重
	return removeSameEl(resultTags.split(",")).toString();	
}

//返回以逗号隔开的tag，如果发现tag中有空格则此tag前后加引号
function structQuotedTag(tagArr){
	var tag = "";
	tagArr.each(function(str){
		if(str.indexOf(' ', 1)>0){
			str = "\"" + str + "\"";
		}
		if(tag!="")
			tag += ",";
		tag += str;
	});			
	return tag;
}

//或者是tag的list，或者是tag的string，两种形式选一。另一个null
function tagEscape(tagList, tagStr){
	if(tagStr != null){
		tagList = tagStr.split(",");
	}
	var i;
	for(i=0; i<tagList.length; i++){
		tagList[i] = tagList[i].toString();
	}
	
	if(tagStr != null){
		return tagList.toString();
	}else{
		return tagList;
	}
}

//比较两个以“,”隔开的tag字符串，得出newTags中需要新增的和需要删除的tag字符串
//oldTags原tag字符串,newTags更新后的tag字符串
//tagInfoTemp输入输出对象, tagInfoTemp.addTags需要新增的tag字符串,tagInfoTemp.delTags需要删除的tag字符串
function getAddDelTags(tagInfoTemp, oldTags, newTags){
	var tagOldList = new Array();
	var tagNewList = new Array();
	if(oldTags)
		tagOldList = oldTags.split(",");
	if(newTags)
		tagNewList = newTags.split(",");
	
	var tagAddList = new Array(); 
	var tagDelList = new Array();
	var i;
	var j;
	//得到需要新增tag
	for(i=0; i<tagNewList.length; i++){
		for(j=0; j<tagOldList.length; j++){
			if(tagNewList[i] == tagOldList[j]){
				break;
			}
		}
		if(j==tagOldList.length){
			tagAddList.push(tagNewList[i]);
		}
	}		
	//得到需要删除tag
	for(i=0; i<tagOldList.length; i++){
		for(j=0; j<tagNewList.length; j++){
			if(tagOldList[i] == tagNewList[j]){
				break;
			}
		}
		if(j==tagNewList.length){
			tagDelList.push(tagOldList[i]);
		}
	}
	
	tagInfoTemp.addTags = tagAddList.toString();
	tagInfoTemp.delTags = tagDelList.toString();
}

/*-----------------------------------------------------------------------------------------------------------------------
   拍拍标签 -- BEGIN
  -----------------------------------------------------------------------------------------------------------------------*/

// 这些内容以后从文件读取


/**
 * 获取pp标签页面的html内容
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html内容
 */
 
// 推荐标签数
var recomTagCount = 0;
// 活动标签数
var actTagCount = 0;

var oldPPTag = '';

var idPrefix1 = "city_";
var idPrefix2 = "other_";

function getPPTagTabHTML(inputId){
	var str = "";
	str+="<span style='color:#aaa;margin-left:0px;'>点击选择对应的标签，必选</span><br />";

	var comCss = "display:inline;margin:0px;padding:2px 5px 0px 5px;border-top:#aaa 1px solid;border-right:#aaa 1px solid;";
	
	str += "<div style='margin-top:3px;padding:0px;overflow:visible;z-index:20;'>";
	str += "	<div id='tagTab1_"+inputId+"'  style='"+comCss+" border-left:#aaa 1px solid;'><span id='tabTitle1' style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(1,\""+inputId+"\",1);'>推荐标签</span></div>";
	str += "	<div id='tagTab2_"+inputId+"' style='"+comCss+"margin-left:-4px!important;margin-left:0px;'><span id='tabTitle2' style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(2,\""+inputId+"\",1);'>活动标签</span></div>";
	str += "	<div id='tagTabShowTags_"+inputId+"' style='padding:5px;background-color:#ffffe1;border:#aaa 1px solid;'></div>";
	str += "</div>";
	
	return str;
}

function get1StepPPRecomTagsHTML(inputId){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>第一步，请选择一个一级标签</div>");
	a.push("<div style='clear:both;'></div>");
	
	// city tags
	a.push("<div style='padding:6px; margin-top:6px; border-top:1px solid #aaa;'>");
	var i = 0;
	var idName;
	aFirstCityTags.each(function(e){
		idName = idPrefix1 + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 0, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	// other tags
//	i = 0;
	a.push("<div style='padding:6px; border-top:1px solid #aaa;'>");
	aFirstOtherTags.each(function(e){
		idName = idPrefix2 + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 0, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	return a.join("");
}

function  set1StepPPElementValue(inputId, tagIndex, el){
	var div = el.parentNode;
	var sId = div.id;
	if(tagIndex == 0){
		if(sId.indexOf(idPrefix1) == 0){
			// because 5 = 'city_'.length
			sId = sId.substr(5);
			$('tagTabShowTags_'+inputId).innerHTML = get2StepPPRecomTagsHTML(inputId, sId, false);
		}
		else if(sId.indexOf(idPrefix2) == 0){
			// because 6 = 'other_'.length
			sId = sId.substr(6);
			$('tagTabShowTags_'+inputId).innerHTML = get2StepPPRecomTagsHTML(inputId, sId, true);
		}
	}
	else if(tagIndex == 1){
		// because 4 = 'act_'.length
		sId = sId.substr(4);

		$('tagTabShowTags_'+inputId).innerHTML = get2StepPPActiveTagsHTML(inputId,sId);
	}
}

function get2StepPPRecomTagsHTML(inputId, index, isOther){
	var a = [];
	var oldIndex = index;
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>第二步，请选择1到3个二级标签</div>");
	a.push("<div style='clear:both;'></div>");
	
	var aFirstTags = aFirstCityTags;
	var aSecondTags1 = aSecondCityTags1;
	var aSecondTags2 = aSecondCityTags2;
	var aSecondTags3 = aSecondCityTags3;
	var secPrefix = idPrefix1;
	if(isOther){
		aFirstTags = aFirstOtherTags;
		aSecondTags1 = aSecondOtherTags1;
		aSecondTags2 = aSecondOtherTags2;
		aSecondTags3 = aSecondOtherTags3;
		
		secPrefix = idPrefix2;
		
		index = index - aFirstCityTags.length;
	}
	
	a.push("<div style='padding:6px 6px 0px 6px; margin-top:6px; border-top:1px solid #aaa;'>");
	a.push("<div style='font-weight:bold;color:#333;'>" + aFirstTags[index] + "</div>");
	
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; border-bottom:1px solid #aaa;'>");
	var i = 0;
	// 第一栏
	var aTag1 = aSecondTags1[index];
	aTag1.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	// TODO, 添加自定义input框的最大长度
	a.push("<div><label>自定义：</label><input id='selfDefinedTag' name='selfDefinedTag' size=22 onkeyup='checkUserInput();' /></div>");
	a.push("</div>");
	
	// 第二栏
	var aTag2 = aSecondTags2[index];
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; border-bottom:1px solid #aaa;'>");
	aTag2.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	// 第三栏
	var aTag3 = aSecondTags3[index];
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; '>");
	aTag3.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='margin-bottom:4px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
	});
	a.push("</div>");
	
	a.push("<div style='padding:0px 6px;margin:0px 0px 4px 20px;'><center><input type='button' style='width:60px;' value='返回' onclick='goBack(\""+ inputId + "\",\""+ oldIndex + "\", 0);' />&nbsp;&nbsp;&nbsp;&nbsp;<input id='selfDefineBtn' type='button' disabled='true' style='width:60px;' value='自定义' onclick='goOk(\""+ inputId + "\", \""+ oldIndex + "\", 0);' /></center></div>");
	
	a.push("</div>");
	return a.join("");
}

function checkUserInput() {
	var	shouldDisable=false;
	
	if ($('selfDefinedTag').value=='')
		shouldDisable=true;
		
	$('selfDefineBtn').disabled=shouldDisable;
}

function set2StepPPElementValue(inputId, index, tagIndex, el){
	var aFirstTags = aFirstCityTags;
	var tmpIndex = index;
	if(index >= aFirstCityTags.length){	// other tags
		aFirstTags = aFirstOtherTags;
		tmpIndex = index - aFirstCityTags.length;
	}
	
	var selectVal;
	if(isIE){
		selectVal = el.innerText;
	}else{
		selectVal = el.text;
	}
	
	if(tagIndex == 0){	// 推荐标签
		var oldIndex = $('hidden_recom').value;

		if(oldIndex==index){
			if(recomTagCount >= 3){
				alert("推荐标签数不能超过3个！");
				return;
			}
			else{
				var sHead = aFirstTags[tmpIndex] + '-'; 
				if(isTheSameTag(inputId, sHead, selectVal)){
					el.onclick = null;
					el.style.cursor = "default";
					el.style.color = "#666";
					return;
				}
			}
		}
		
		var sOldHead;
		if(oldIndex >= aFirstCityTags.length)
			sOldHead = aFirstOtherTags[oldIndex - aFirstCityTags.length] + '-';
		else
			sOldHead = aFirstCityTags[oldIndex] + '-';
			
		var sNewHead = aFirstTags[tmpIndex] + '-';
		recomTagCount = deal2StepClick(inputId, 'hidden_recom', recomTagCount, index, sOldHead, sNewHead, el);
	}
	else if(tagIndex == 1){
		var oldIndex = $('hidden_act').value;

		if(oldIndex==index){
			if(actTagCount >= 3){
				alert("活动标签数不能超过3个！");
				return;
			}
			else{
				var sHead = aFirstActiveTags[index] + '-'; 
				if(isTheSameTag(inputId, sHead, selectVal)){	// 判断重复与否
					el.onclick = null;
					el.style.cursor = "default";
					el.style.color = "#666";
					return;
				}
			}
		}
		
		var sOldHead = aFirstActiveTags[oldIndex] + '-';
		var sNewHead = aFirstActiveTags[index] + '-';
		actTagCount = deal2StepClick(inputId, 'hidden_act', actTagCount, index, sOldHead, sNewHead, el);
	}
}

/*
 * @parma	{String}	inputId
 * @param	{Number}	tagIndex
 *			0 -- 推荐标签，1 -- 活动标签
 */
function goBack(inputId, index, tagIndex){
	var sHead;
	if(tagIndex == 0){
		var aFirstTags = aFirstCityTags;
		if(index >= aFirstCityTags.length){	// other tags
			aFirstTags = aFirstOtherTags;
			index = index - aFirstCityTags.length;
		}
		
		$('tagTabShowTags_'+inputId).innerHTML = get1StepPPRecomTagsHTML(inputId);
		recomTagCount = 0;
		sHead = aFirstTags[index] + '-';
	}
	else if(tagIndex == 1){
		$('tagTabShowTags_'+inputId).innerHTML = get1StepPPActiveTagsHTML(inputId);
		actTagCount = 0;
		sHead = aFirstActiveTags[index] + '-';
	}
	
	var str = $(inputId).value;
	if(str){
		$(inputId).value = removePart(str, sHead);
	}
}

// 确定
function goOk(inputId, index, tagIndex){
	var selfTag = $('selfDefinedTag').value;
	if(tagIndex == 0){	// 推荐标签页
		// 自定义框里只能填入一个标签名
		// TODO 处理输入逗号的情况
		if(selfTag != ''){
			var aFirstTags = aFirstCityTags;
			var tmpIndex = index;
			if(index >= aFirstCityTags.length){	// other tags
				aFirstTags = aFirstOtherTags;
				tmpIndex = index - aFirstCityTags.length;
			}
	
			var oldIndex = $('hidden_recom').value;
			var sOldHead;
			if(oldIndex >= aFirstCityTags.length)
				sOldHead = aFirstOtherTags[oldIndex - aFirstCityTags.length] + '-';
			else
				sOldHead = aFirstCityTags[oldIndex] + '-';
			var sNewHead = aFirstTags[tmpIndex] + '-';
			recomTagCount = deal2StepOk(inputId, 'hidden_recom', recomTagCount, index, sOldHead, sNewHead, selfTag);
		}
		else if(recomTagCount == 0){
			alert("请选择二级标签或自定义您的二级标签！\n\n您也可以点击返回，重新选择一级标签。");
			return;
		}
	}
	else if(tagIndex == 1){	// 活动标签页
		// 自定义框里只能填入一个标签名
		// TODO 处理输入逗号的情况
		if(selfTag != ''){
			var oldIndex = $('hidden_act').value;
			var sOldHead = aFirstActiveTags[oldIndex] + '-';
			var sNewHead = aFirstActiveTags[index] + '-';
			actTagCount = deal2StepOk(inputId, 'hidden_act', actTagCount, index, sOldHead, sNewHead, selfTag);
		}
		else if(actTagCount == 0){
			alert("请选择二级标签或自定义您的二级标签！\n\n您也可以点击返回，重新选择一级标签。");
			return;
		}
	}
}

function deal2StepOk(inputId, hiddenId, count, index, sOldHead, sNewHead, selfTag){
	var oDocOb = $(inputId);
	var oldIndex = $(hiddenId).value;
			
	if(oldIndex == -1 || oldIndex == index){
		if(count == 3){
			alert("由于您已经选择了3个二级标签，不能再加入您输入的标签！\n\n请先返回，重新选择。");
			return;
		}
			
		if(oldIndex == index && isTheSameTag(inputId, sNewHead, selfTag)){	// 判断重复与否
			hideUserAllTags(inputId,'ppTag');
			return count;
		}
		
		$(hiddenId).value = index;
		// 若标签数未超过3个，将用户自定义标签加入
				
		if(oDocOb.value.indexOf('-',1) == -1){
			oDocOb.value = sNewHead + selfTag;
		}
		else{
			oDocOb.value = oDocOb.value + ',' + sNewHead + selfTag;
		}
				
		count++;
		hideUserAllTags(inputId,'ppTag');
	}
	else{	// 一级标签和先前选择的不一样，删除原来一级标签有关的
		oDocOb.value = removePart(oDocOb.value, sOldHead);
				
		if(oDocOb.value == ''){
			oDocOb.value = sNewHead + selfTag;
		}
		else{
			oDocOb.value = oDocOb.value + ',' + sNewHead + selfTag;
		}
				
		$(hiddenId).value = index;
		count = 1;
		hideUserAllTags(inputId,'ppTag');
	}
	
	return count;
}

function get1StepPPActiveTagsHTML(inputId){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>第一步，请选择一个一级标签</div>");
	a.push("<div style='clear:both;'></div>");
	
	a.push("<div style='padding:6px; margin-top:6px; border-top:1px solid #aaa;'>");
	var i = 0;
	var idName;
	aFirstActiveTags.each(function(e){
		idName = 'act_' + i;
		a.push("<div id=" + idName + " style='margin-bottom:4px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 1, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	return a.join("");
}

function get2StepPPActiveTagsHTML(inputId, index){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>第二步，请选择1到3个二级标签</div>");
	a.push("<div style='clear:both;'></div>");
	
	a.push("<div style='padding:6px 6px 0px 6px; margin-top:6px; border-top:1px solid #aaa;'>");
	a.push("<div style='font-weight:bold;color:#333;'>" + aFirstActiveTags[index] + "</div>");
	
	a.push("<div style='padding:0px 6px 6px 6px; margin:6px 0px;border-top:1px solid #aaa;'>");
	// 第一栏
	var aTag1 = aSecondActTags1[index];
	aTag1.each(function(e){
		idName = "act_" + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ index + "\", 1, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	// TODO, 添加自定义input框的最大长度
	a.push("<div><label>自定义：</label><input id='selfDefinedTag' name='selfDefinedTag' size=32 /></div>");
	a.push("</div>");
	
	a.push("<div style='padding:0px 6px;margin:0px 0px 4px 20px;'><center><input type='button' style='width:60px;' value='返回' onclick='goBack(\""+ inputId + "\",\""+ index + "\", 1);' />&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' style='width:60px;' value='确定' onclick='goOk(\""+ inputId + "\", \""+ index + "\", 1);' /></center></div>");
	
	a.push("</div>");
	
	return a.join("");
}

function isTheSameTag(inputId, sHead, selectVal){
	var snewTag = sHead + selectVal;
	var aTags = $(inputId).value.split(',');
	var ret = false;
	
	for(var i=0; i<aTags.length; i++){
		if(aTags[i] == snewTag){
			ret = true;
			break;
		}
	}
	
	return ret;
}

function deal2StepClick(inputId, hiddenId, count, index, sOldHead, sNewHead, el){
	var oDocOb = $(inputId);
	var selectVal;
	if(isIE){
		selectVal = el.innerText;
	}else{
		selectVal = el.text;
	}
	
	var oldIndex = $(hiddenId).value;
	if(oldIndex == -1 || oldIndex == index){
		$(hiddenId).value = index;
		count++;
	}	
	else{
		$(hiddenId).value = index;
		oDocOb.value = removePart(oDocOb.value, sOldHead);
		
		count = 1;
	}

	if(oDocOb.value == ''){
		oDocOb.value = sNewHead + selectVal;
	}
	else{
		oDocOb.value = oDocOb.value + ',' + sNewHead + selectVal;
	}
		
	el.onclick = null;
	el.style.cursor = "default";
	el.style.color = "#666";
	
	return count;
}

function removePart(strInput, sHead){
	var aTags = strInput.split(',');
	var a = [];
			
	aTags.each(function(e){
		if(e.indexOf(sHead) == -1){
			a.push(e);
		}
	});
			
	return a.join(',');
}

function changeBgImage(element){
	var div = element.parentNode;
	div.style.backgroundColor = "green";
}

function resetBgImage(element){
	var div = element.parentNode;
	div.style.backgroundColor = "";
}
/*-----------------------------------------------------------------------------------------------------------------------
   拍拍标签 -- END
  -----------------------------------------------------------------------------------------------------------------------*/
  
/**
 * 获取标签页面的html内容
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html内容
 */
function getTagTabHTML(inputId){
	var str = "";

	var comCss = "display:inline;margin:0px;padding:2px 5px 0px 5px;border-top:#aaa 1px solid;border-right:#aaa 1px solid;";
	
	str += "<div style='margin-top:3px;padding:0px;overflow:visible;z-index:20;'>";
	str += "	<div id='tagTab1_"+inputId+"'  style='"+comCss+" border-left:#aaa 1px solid;'><span style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(1,\""+inputId+"\",0);'>已有标签</span></div>";
	str += "	<div id='tagTab2_"+inputId+"' style='"+comCss+"margin-left:-4px!important;margin-left:0px;'><span style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(2,\""+inputId+"\",0);'>推荐标签</span></div>";
	str += "	<div id='tagTabShowTags_"+inputId+"' style='padding:5px;background-color:#ffffff;border:#aaa 1px solid; table-layout:auto;'></div>";
	str += "</div>";
	return str;
}

// 判断用户标签的有无
function isNoUserTags(){
	if(g_userTagList.length == 0)
		return true;
	else
		return false;
}

//得到用户tag
function getUserTagsHTML(inputId){
	var a = [];
	var comCss2 = "float:right;padding-bottom:3px; color:#aaa;";
	a.push("<div style='"+comCss2+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	if(isNoUserTags()){
		a.push("<div style='text-align:center;color:#333333;margin-top:25px;'>您目前还没有标签，请输入标签或从推荐标签栏选择！</div>");
	}
	else{
		a.push('<div class="g_w_100 g_t_wrap" style="_height:1%;margin-top:25px;">');
		g_userTagList.each(function(e){
			if(e.tagName!=""){
				a.push("&nbsp;<a style='color:#333333;' href='#' style='margin-right:2px;' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + e.tagName + "</a>&nbsp;");
			}
		});
        a.push('</div>');	
	}
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>多个标签请用逗号或者空格隔开</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>标签便于你管理博客内容</div>");
		
	return a.join("");
}

//得到推荐tag
function getRecomTagsHTML(inputId, index){
	if(inputId == "editBlogTag")	// 日志标签
		return getBlogRecomTagsHTML(inputId,index);
	
	if(inputId.indexOf("photoTag") == 0 || inputId.indexOf("albumTag") == 0)	// 相片相关标签
		return getPhotoRecomTagsHTML(inputId);
		
	var a = [];
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
		
	a.push("<div class='g_w_100 g_t_wrap' style='_height:1%;margin-top:25px;'>");
	recomTagArr.each(function(e){
		// 推荐标签不可能为空，因为都是事先设定的
		a.push("<a style='color:#333333;' href='#' style='padding:3px 0px;' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + e + "</a>&nbsp;&nbsp;");
	});
	a.push("</div>");
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>多个标签请用逗号或者空格隔开</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>标签便于你管理博客内容</div>");
		
	return a.join("");
}

function getPhotoRecomTagsHTML(inputId){
	var showUserTagsDiv = $("showUserTagsDiv_"+inputId);
	var width = showUserTagsDiv.style.width;
	var iWidth = parseInt(width);
	var a = [];
	var count = 0;
	var i = 0;
	
	var col_num = 7;
	
	if(iWidth <= 200)
		col_num = 5;
	
	var tagCss = "width:32px;padding:0px 4px 4px 4px;";	
	
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='padding-bottom:25px;'></div>");
	
	a.push("<div><center><table style='text-align:left;table-layout:auto;'><tbody>");	// 用table便于对齐
	for(; i<recomPhotoTags.length; i++){	
		if(count == 0){
			a.push("<tr>");
		}
		else if(count % col_num == 0){
			a.push("</tr><tr>");
		}
		
		a.push("<td style='"+tagCss+"'><a style='color:#333333;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomPhotoTags[i] + "</a></td>");
		
		count++;
	}
	a.push("</tr></tbody></table></center></div>");
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>多个标签请用逗号或者空格隔开</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>标签便于你管理博客内容</div>");
	
	return a.join("");
}

/**
 * 获取推荐tag的多个tab的html
 * @param	{String}	inputId
 * 			element id
 * @param	{Number}	curTabIndex
 * 			tab索引，用于
 * @return	{String}
 * 			多个tab的html
 * TABS_LEN	标识tab的个数，主要和div宽度有关
 */
var TABS_LEN = 11;
function getBlogRecomTagsHTML(inputId, curTabIndex){
	// 用于以后推荐类别很多时的扩展
//	var isHead = 0;
//	var isEnd = 0;
//	
//	if(curTabIndex == 1)
//		isHead = 1;
//	
//	if((curTabIndex+TABS_LEN) > recomTagArrs.length)
//		isEnd = 1;
		
	var a = [];
	
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' id='close_btn' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
//	a.push("<div style='padding-bottom:25px;'></div>");
	a.push("<div style='margin-left:4px;padding-bottom:3px;margin-top:25px;'>");
	if(getIEVer() == 7)
		var comCss = "display:inline;padding:0px 6px;border-right:1px solid #aaaaaa;text-align:center;";
	else
		var comCss = "display:inline;padding:0px 7px 0px 8px;border-right:1px solid #aaaaaa;text-align:center;";
//	if(isHead == 1)
//		str +="	<div id='tagTabPrevRecom' style='"+comCss+"'>" + "<" + "</div>";
//	else
//		str +="	<div id='tagTabPrevRecom' style='"+comCss+"'><a id='aTagPrevRecom' href='#' onclick='recomTabDoPage(0,\""+curTabIndex+"\",\""+inputId+"\"); return false;'>" + "<" + "</a></div>";
	
	var i = curTabIndex;
	var count = 0;
	
	for(; i<=recomTagArrs.length; i++){	// i从1开始，所以<=
		if(count == TABS_LEN)
			break;
	
		var tagId = "tagTabRecom" + i;
		if(i == recomTagArrs.length)
			a.push("<div id='"+tagId+"' style='"+comCss+" border-right:0px;'><span style='color:#333333;cursor:pointer;' onclick='return recomTagTabClick(\""+i+"\",\""+inputId+"\",\""+curTabIndex+"\");'>"+recomTagTabNames[i-1]+ "</span></div>");
		else
			a.push("<div id='"+tagId+"' style='"+comCss+"'><span style='color:#333333;cursor:pointer;' onclick='return recomTagTabClick(\""+i+"\",\""+inputId+"\",\""+curTabIndex+"\");'>"+recomTagTabNames[i-1]+ "</span></div>");
		count++;
	}
	
//	if(isEnd == 0)
//		str +="	<div id='tagTabNextRecom' style='"+comCss+"'><a id='aTagNextRecom' href='#' onclick='recomTabDoPage(1,\""+curTabIndex+"\",\""+inputId+"\"); return false;'>" + ">" + "</a></div>";
//	else
//		str +="	<div id='tagTabNextRecom' style='"+comCss+"'>" + ">" + "</div>";
//	
	a.push("</div>");

	a.push("<div id='tagTabShowRecomTags' style='padding:10px 4px 5px 4px;background-color:#ffffff;'></div>");

	return a.join("");
}

/**
 * 处理推荐tag的tab翻页
 * @param	{Number}	isPrev
 * 			0 -- 上一页，1 -- 下一页
 * @param	{String}	curTabIndex
 * 			第一个tab的索引
 * @param	{String}	inputId
 * 			element id
 * @return	{Void}
 * 
 * @see		#getRecomTagsHTML
 * @see		#recomTagTabClick
 */
function recomTabDoPage(isPrev, curTabIndex, inputId){
	var index = parseInt(curTabIndex);

	if(isPrev == 0)
		index = parseInt(curTabIndex) - 1;
	else
		index = parseInt(curTabIndex) + 1;
	
	$('tagTabShowTags_'+inputId).innerHTML = getRecomTagsHTML(inputId,index);
	
	recomTagTabClick(index + "", inputId, index);
}

//全局数组记录已经显示用户所有tag的div的id数组 ，每次showUserAllTags都轮询数组，保证页面中只显示一个div
var g_showUserAllTagsDiv = [];
//显示用户tag,type=1提示信息同行显示，type=2不同行显示
function showUserAllTags(tagInputEl){
	// 使input能修改
	tagInputEl.readOnly = false;
	var inputId = tagInputEl.id;
	var showTagId = "showUserTagsDiv_"+inputId;
	var showUserTagsDiv = $(showTagId);

	if(showUserTagsDiv.style.borderBottomStyle == "dotted"){
		return false;
	}
	
	if(showUserTagsDiv.style.display != "none" && showUserTagsDiv.innerHTML != "")	// 如果已经生成过内容且没有隐藏，直接显示
		return false;
		
	//轮询数组，保证页面中只显示一个div
	for(var i=0; i<g_showUserAllTagsDiv.length; i++){
		var eT = $(g_showUserAllTagsDiv[i]);
		if(eT){
			eT.innerHTML = "";
			eT.style.border = "none";
		}
	}
	g_showUserAllTagsDiv.push(showTagId);
	
	showUserTagsDiv.innerHTML = getTagTabHTML(inputId);
	showUserTagsDiv.style.display = "block";
	
	if(isNoUserTags()){
		tagTabclick(2, inputId, 0);
	}else{
		tagTabclick(1, inputId, 0);	
	}
	
	return false;	
}

var g_showPPTagsDiv = [];
function showPPTags(tagInputEl){
	// 在pp标签下使input不能修改
	tagInputEl.readOnly = true;
	var inputId = tagInputEl.id;
	var showTagId = "showUserTagsDiv_"+inputId;
	var showUserTagsDiv = $(showTagId);

	if(showUserTagsDiv.style.display != "none" && showUserTagsDiv.innerHTML != "")	// 如果已经生成过内容且没有隐藏，直接显示
		return false;
		
	//轮询数组，保证页面中只显示一个div
	for(var i=0; i<g_showPPTagsDiv.length; i++){
		var eT = $(g_showPPTagsDiv[i]);
		if(eT){
			eT.innerHTML = "";
			eT.style.border = "none";
		}
	}
	g_showPPTagsDiv.push(showTagId);
	
	showUserTagsDiv.innerHTML = getPPTagTabHTML(inputId);
	showUserTagsDiv.style.display = "block";
	
	tagTabclick(1, inputId, 1);	
	
	return false;
}

function hideUserAllTags(inputId){
//	debugger;
	var showUserTagsDiv =$("showUserTagsDiv_"+inputId);
	showUserTagsDiv.style.display = "none";
	return false;	
}

/**
 * 处理点击标签tab事件
 * @param	{Number}	type
 * 			1 -- 用户tag，2 -- 推荐tag
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- 非拍拍标签，1 -- 拍拍标签
 * @return	{Boolean}
 * 			无特殊意义
 * @see		#getUserTagsHTML
 * @see		#getRecomTagsHTML
 */
function tagTabclick(type, inputId, index){
	var tab1Style = $('tagTab1_'+inputId).style;
	var tab2Style = $('tagTab2_'+inputId).style;
	
	var tab1ChildStyle = $('tagTab1_'+inputId).firstChild.style;
	var tab2ChildStyle = $('tagTab2_'+inputId).firstChild.style;
	if(type==1 && tab1ChildStyle.color != '#333333'){	// 已经显示当前tab，那么直接返回
		$('tagTabShowTags_'+inputId).style.backgroundColor = "#ffffff";
		$('tagTabShowTags_'+inputId).innerHTML = getTab1HTML(inputId, index);
		//css固定，不需要提取到css文件
		tab1Style.backgroundColor = "#ffffff";
		tab1Style.borderBottom = "#ffffff 1px solid";
		tab1Style.marginBottom = "-1px";
		tab1Style.position="relative";

		tab1ChildStyle.color = "#333333";
		
		tab2Style.backgroundColor = "#eeeeee";
		tab2Style.borderBottom = "#aaa 1px solid";
		tab2ChildStyle.color = "#aaaaaa";
		
		$('tagTabShowTags_'+inputId).style.borderLeft = "#aaa 1px solid";
		
		// 将当前tab名设置成不可点击的样式，将另一设置成可点击
		tab1ChildStyle.cursor = 'default';
		tab2ChildStyle.cursor = 'pointer';
	}
	else if(type==2 && tab2ChildStyle.color != '#333333'){
		$('tagTabShowTags_'+inputId).innerHTML = getTab2HTML(inputId, index);
		tab2ChildStyle.color = "#333333";
	
		if(inputId == "editBlogTag"){	// 如果是日志标签，另作处理
			recomTagTabClick("1", inputId, 1);
		}

		tab2Style.backgroundColor = "#ffffff";
		tab2Style.borderBottom = "#ffffff 1px solid";
		tab2Style.marginBottom = "-1px";
		tab2Style.position="relative";
		
		tab1Style.backgroundColor = "#eeeeee";
		tab1Style.borderBottom = "#aaa 1px solid";
		tab1ChildStyle.color = "#aaaaaa";
		
		tab1ChildStyle.cursor = 'pointer';
		tab2ChildStyle.cursor = 'default';
	}
	
	return false;
}

/**
 * 获取第一个tab的html
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- 非拍拍标签，1 -- 拍拍标签
 * @return	{String}
 * 			html code
 * @see		#getUserTagsHTML
 * @see		#get1StepPPRecomTagsHTML
 */
function getTab1HTML(inputId, index){
	if(index == 0){
		return getUserTagsHTML(inputId);
	}
	else if(index == 1){
		return get1StepPPRecomTagsHTML(inputId);
	}
}

/**
 * 获取第二个tab的html
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- 非拍拍标签，1 -- 拍拍标签
 * @return	{String}
 * 			html code
 * @see		#getRecomTagsHTML
 * @see		#get1StepPPActiveTagsHTML
 */
function getTab2HTML(inputId, index){
	if(index == 0){
		return getRecomTagsHTML(inputId,1);
	}
	else if(index == 1){
		return get1StepPPActiveTagsHTML(inputId);
	}
}

/**
 * 点击分类推荐标签tag事件
 * @param	{String}	type
 * 			推荐tag的子类索引
 * @param	{String}	inputId
 * 			element id
 * @param	{String}	curTabIndex
 * 			推荐tag的tab索引，标识当前是从哪个tab开始显示推荐tag的
 * 			因为tab也可以前/后一页
 * @return	{Boolean}
 * 			无特殊意义
 * @see		#getSpecificRecomTagsHtml
 */
function recomTagTabClick(type, inputId, curTabIndex){
	$('tagTabShowRecomTags').innerHTML = getSpecificRecomTagsHtml(type,0,1,inputId);
	
	// 加粗被点击的tag
	var count = 0;
	var index = parseInt(curTabIndex);
	var i;
	for(; count<TABS_LEN; count++) {
		i = index+count;
		$('tagTabRecom'+i).style.fontWeight = "normal";
		$('tagTabRecom'+i).firstChild.style.color = "#777777";
	}
	
	$('tagTabRecom'+type).style.fontWeight = "bold";
	$('tagTabRecom'+type).firstChild.style.color = "#333333";
	
	return false;
}

/**
 * 获取推荐tag的tab页的内容
 * @param	{String}	type
 * 			推荐tag的子类索引
 * @param	{Number}	startIndex
 * 			索引，标识tag内容数组开始读取之处
 * @param	{Number}	iPage
 * 			当前页
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html格式
 * @see		#getRecomTagArrByType
 */
 var LINE_NUM = 8;								// 一页显示的行数
 var ELE_NUM_PER_LINE = 7;						// 每行显示的标签数
 var PAGE_NUM = LINE_NUM * ELE_NUM_PER_LINE;	// 一页显示的标签数
function getSpecificRecomTagsHtml(type, startIndex, iPage, inputId){
	// 计算"上页 1/1 下页"的位置
	var showUserTagsDiv = $("showUserTagsDiv_"+inputId);
	var width = showUserTagsDiv.style.width;
	var iWidth = parseInt(width);
	var mlOfPage = iWidth - 112;	// ml -- margin-left
	mlOfPage += "px";
	
	var recomTagArr = getRecomTagArrByType(type+"");
	var a = [];
	var count = 0;
	
	var tagCss = "width:65px;padding:0px 8px 8px 8px;";	
	
	a.push("<table style='table-layout:auto;'><tbody>");	// 用table便于对齐
	for(; startIndex<PAGE_NUM*iPage; startIndex++){	// 保证每页显示PAGE_NUM个标签
		if(count == 0){
			a.push("<tr>");
		}
		else if(count % ELE_NUM_PER_LINE == 0){
			a.push("</tr><tr>");
		}
		
		if(startIndex < recomTagArr.length){		// 如果此索引的标签存在，显示
			if(isHotTag(recomTagArr[startIndex]))	// 热门标签用显著的颜色显示
				a.push("<td style='"+tagCss+"'><a style='color:#ff7500;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomTagArr[startIndex] + "</a></td>");
			else
				a.push("<td style='"+tagCss+"'><a style='color:#333333;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomTagArr[startIndex] + "</a></td>");		
		}
		else										// 不存在，留空
			a.push("<td style='"+tagCss+"'>&nbsp;&nbsp;</td>");

		if(count == (PAGE_NUM-1)){
			a.push("</tr>");
			break;
		}
		
		count++;
	}
	a.push("</tbody></table>");
	
	var comCss = "margin-left:"+mlOfPage+";padding-top:6px;color:#aaaaaa;";
	if(recomTagArr.length <= PAGE_NUM){
		a.push("<div style='"+comCss+"'>上页&nbsp;&nbsp;<span style='font-weight:bold;'>1</span>/1&nbsp;&nbsp;下页</div>");
	}
	else{
		var totalPage = Math.floor(recomTagArr.length / PAGE_NUM) + 1;
		var pageContent = "<span style='font-weight:bold;'>"+ iPage + "</span>/" + totalPage;
		// 如果回退到第一页，则将“上一页”变成不能点击
		if(iPage == 1)
			a.push("<div style='"+comCss+"'>上页&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;<a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(1,\""+ type + "\",\""+ 1 + "\",\""+ inputId + "\"); return false;'>下页</a></div>");
		else if(iPage == totalPage)
			a.push("<div style='"+comCss+"'><a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(0,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>上页</a>&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;下页</div>");
		else
			a.push("<div style='"+comCss+"'><a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(0,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>上页</a>&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;<a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(1,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>下页</a></div>");
	}
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>多个标签请用逗号或者空格隔开</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>标签便于你管理博客内容</div>");
	
	return a.join("");
}

function isHotTag(sTag){
	var bHot = false;
	var e = hotTags.length;
	for(var i=0; i<e; i++){
		if(sTag == hotTags[i]){
			bHot = true;
			break;
		}
	}
	
	return bHot;
}
/**
 * 处理推荐tag的tab页面内翻页
 * @param	{Number}	isPrev
 * 			0 -- 上一页，1 -- 下一页
 * @param	{String}	type
 * 			推荐tag的子类索引
 * @param	{Number}	curPage
 * 			tab页面内当前页
 * @param	{String}	inputId
 * 			element id
 * @return	{Void}
 * @see		#getSpecificRecomTagsHtml
 */
function recomTagDoPage(isPrev, type, curPage, inputId){
	var j, iPage;
	if(isPrev == 0){
		j = (curPage-2)*PAGE_NUM;
		iPage = parseInt(curPage) - 1;
	}
	else{
		j = curPage*PAGE_NUM;
		iPage = parseInt(curPage) + 1;
	}
	
	$('tagTabShowRecomTags').innerHTML = getSpecificRecomTagsHtml(type, j, iPage, inputId);
}

/**
 * 获取含有标签内容的数组
 * @param	{String}	type
 * 			推荐tag的tab索引
 * @return	{Array}
 * 			含有标签内容的数组
 */
function getRecomTagArrByType(type){
	var index = type - 1;
	if(index < recomTagArrs.length)
		return recomTagArrs[index];
	else	// 越界，返回第一组
		return recomTagArrs[0];
}

var beforeAddTag;
function  setElementValue(element, el){
	var value;
	if(isIE){
		value = el.innerText;
	}else{
		value = el.text;
	}
	
	if(value.indexOf(' ', 1)>0){
		value = "\"" + value + "\"" ;
	}
	
	var oDocOb = $(element);
	
	var tmp = "";
	if (oDocOb.value == "") {
		tmp = value;
	} else {
		tmp = oDocOb.value + "," + value;
	}
	
	if(oDocOb.maxLength == -1)	// 未设最大长度值,firefox是-1，ie设成一个很大的值，不影响程序逻辑
		oDocOb.value = tmp;
	else {
		if(tmp.length > oDocOb.maxLength){
			alert("标签已超过了最大长度！");
			return;
		}
		else
			oDocOb.value = tmp;
	}
	
	if(beforeAddTag){
		beforeAddTag();
	}
	el.onclick = null;
	el.style.cursor = "default";
	el.style.color = "#aaa";
}
/** 
 * @fileoverview 
 * 日志浏览页面的左侧导航栏
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */

if (NEBlog==undefined){
	var NEBlog={};
}


NEBlog.EditBlogLeft = Class.create();

NEBlog.EditBlogLeft.recentComNumber = 5;
NEBlog.EditBlogLeft.archiveNumber = 8;

NEBlog.EditBlogLeft.aInfoId = ["_$_blog_class", "_$_blog_arch", "_$_blog_comm"];
NEBlog.EditBlogLeft.aInfoArrowId = ["divArrowCls", "divArrowArch", "divArrowCom"];
NEBlog.EditBlogLeft.sArchTitleId = "divYearArch";
NEBlog.EditBlogLeft.sArchContentId = "uYearArch";

NEBlog.EditBlogLeft.prototype = {
	/**
	 * EditBlogLeft类构造函数 初始化EditBlogLeft对象并预设参数
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeft实例对象名字	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft对象
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sParentName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// 测试开关on或者off	
			sStyle  			:	null,		// 日志的样式地址前缀
			sSel					: '-1',
			sSelId				: '-1'
		}, arguments[2]||{});
		/**
		 * 对象实例名称
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * 调用改对象的父类对象名称
		 * @private
		 * @type	String
		 */
		this._sParentName = sParentName;
		/**
		 * 因为blinddown有延时,需要控制其同步状态
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * 测试类对象
		 * @private
		 * @type	Objects
		 */
		this._oTester4EBL = null;
		
		this._bHasClass = false;
		/**
		 * 是否生成过"归档"模块的数据
		 * @private
		 * @type	Boolean
		 */
		this._bHasArchive = false;
		/**
		 * 是否生成过"最新评论"模块的数据
		 * @private
		 * @type	Boolean
		 */
		this._bHasRecentComments = false;
		/**
		 * 最新评论数组, 被prevBlog.js使用
		 * @type	Array
		 */
		this._aRecentComments;
		
		this._aClasses = [];
		
		this._aArchives = [];
		
		this._aRcntComments = [];
		
		this._oWindowManager = null;
				
		this._init();
		
		return this;
	},

	_init: function() {		
		//初始化时不载入存档和最近评论, 当第一次打开的时候才载入,载入后就不需重复载入
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBL = new NECtrl.SeleniumTester();
		
		if (this._oOptions.sSel == 'arch') {
			$(NEBlog.EditBlogLeft.aInfoId[1]).style.display = "block";
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[1]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			BlogBean.getRecentArchives(UD.hostId, this._showArchives.bind(this));		
		}			
		else {
			$(NEBlog.EditBlogLeft.aInfoId[0]).style.display = "block";
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[0]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			BlogBean.getBlogClasses(UD.hostId, this._showBlogClasses.bind(this));	
			this._bHasClass = true;	
		}
	},
	
	showHideInfo: function(iInfoId){
		if (this._bShowHiding == true)
			return;
		var _divCont = $(NEBlog.EditBlogLeft.aInfoId[iInfoId]);	
		if(_divCont.style.display=="none") {
			if(iInfoId == 1 && !this._bHasArchive) {//归档
				this._bHasArchive = true;
				//获取归档
				BlogBean.getRecentArchives(UD.hostId, {
				  callback:function(dataFromServer) {
				    this._showArchives(dataFromServer);
				  }.bind(this)
				});	
			} else if(iInfoId == 2 && ! this._bHasRecentComments){//最新评论
				//获取最近的评论
				this._bHasRecentComments = true;
				BlogBean.getRecentComments(UD.hostId, NEBlog.EditBlogLeft.recentComNumber, this._showRecentComments);
			}	else if(iInfoId == 0 && ! this._bHasClass){//最新评论 
				//获取最近的评论
				this._bHasClass = true;
				BlogBean.getBlogClasses(UD.hostId, this._showBlogClasses.bind(this));
			}	
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[iInfoId]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			this._bShowHiding = true;
			Effect.BlindDown(_divCont,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}
		else {
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[iInfoId])
			//_oArrow.className = _oArrow.className.replace("i68", "i70");
			this._bShowHiding = true;
			Effect.BlindUp(_divCont,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}
	},
	
	showHideArch: function(sIdSuffix){
	  if (this._bShowHiding == true)
			return;
	  var _divArchTitle = $(NEBlog.EditBlogLeft.sArchTitleId + sIdSuffix);
	  var _divArchContent = $(NEBlog.EditBlogLeft.sArchContentId + sIdSuffix);
	  if (_divArchContent.style.display=="none") {
	    _divArchTitle.className = _divArchTitle.className.replace("i29", "i46");
	    Effect.BlindDown(_divArchContent,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}});
	  } else {
	    _divArchTitle.className = _divArchTitle.className.replace("i46", "i29");
	    Effect.BlindUp(_divArchContent,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}});
	  }
	},
	
	_showBlogClasses: function(classes) {
		if (classes != null)
			this._aClasses = classes;
		var data = {classes: classes, pageName: UD.pageName, hostPath: UD.hostPath, 
				objectName: this._sObjectName, parentName: this._sParentName, selId: this._oOptions.sSelId};	
		$("_$_blog_class").innerHTML = jst_blog_edit_class.processUseCache(data);
		
		if (this._oTester4EBL) {
			if (classes == null || classes.length == 0) {
				this._sTest4EBL("LClass", "null");
			} else {
				var _aClsId = classes.pluck("id");
				this._sTest4EBL("LClass", _aClsId);
			}
		}	
	},
	
	refreshBlogClasses: function(cls, op) {
		if (this._aClasses == null)
			this._aClasses = [];
		if (cls != undefined && cls != null) {
			if (op == 'a')
				this._aClasses.push(cls);
			else if (op == 'd') {
				this._aClasses = this._aClasses.reject(function(e) {
					return e.id == cls.id;
				});		
			} else if (op == 'e') {
				for (var i = 0; i < this._aClasses.length; i++) {
					if (this._aClasses[i].id == cls.id) {
						this._aClasses[i].className = cls.className;
						break;
					}
				}
			}
		}
		this._showBlogClasses(this._aClasses);
	},
	 
	_showArchives: function(archives) {
		if (archives != null)
			this._aArchives = archives;
		var yearArchs = [];
		var yearIndex = -1;	
		var archiveCount = archives.length;
		for (var i = 0; i < archiveCount; i++) {
			var date = new Date(archives[i].archiveDate);
			var year = date.getFullYear();
			var month = parseInt(date.getMonth()) + 1;
			var count = 0;		
			count = archives[i].blogCount;
			if (count == 0) {
				continue;
			}
			if (yearIndex >= 0 && yearArchs[yearIndex].year == year) {
				var monthArch = new MonthArchive(year, month, count);
				yearArchs[yearIndex].archives.push(monthArch);
			} else {
				var yearArch = new YearArchive(year);
				var monthArch = new MonthArchive(year, month, count);
				yearArch.archives.push(monthArch);
				yearArchs.push(yearArch);
				yearIndex++;
			}
		}
		var data = {yearArchs: yearArchs, pageName: UD.pageName, hostPath: UD.hostPath, 
				objectName: this._sObjectName, parentName: this._sParentName, sel: this._oOptions.sSel, selId: this._oOptions.sSelId};
		$(NEBlog.EditBlogLeft.aInfoId[1]).innerHTML = jst_blog_edit_arch.processUseCache(data);
		
		if (this._oTester4EBL) {
			if(archives == null || archives.length == 0) {
				this._sTest4EBL("LArch", "null");
			} else {
				var _aArchId = archives.pluck("id");
				this._sTest4EBL("LArch", _aArchId);
			}
		}	
	},
	
	_showRecentComments :function(comments) {
		if (comments != null)
			this._aRcntComments = comments;
		for (var i = 0; i < comments.length; i++)
			comments[i].content = extractHtmlText(comments[i].content);
		var data = {comments: comments, hostPath: UD.hostPath};
		$(NEBlog.EditBlogLeft.aInfoId[2]).innerHTML = jst_blog_edit_rcntcom.processUseCache(data);
		this._aRecentComments = comments;
		
		if (this._oTester4EBL) {
			if (comments == null || comments.length == 0) {
				this._sTest4EBL("LRcntCom", "null");
			} else {
				var _aRcntComId = comments.pluck("id");
				this._sTest4EBL("LRcntCom", _aRcntComId);
			}
		}	
	},
	
	
	showClsAddDiv: function(op, refObj, offsetX, offsetY, oldClsId) {
		var _oRefObj = $(refObj);	
		var lfoffset = Position.cumulativeOffset(_oRefObj);	
		var _oClsDiv	
		if (op == "add") {
			_oClsDiv = $('addClsDiv');
		} else if (op == "edit") {
			_oClsDiv = $('editClsDiv');
			$("oldClsId").innerHTML = oldClsId;
		}
		if (offsetX == null || offsetX == -1)
			_oClsDiv.style.left=(lfoffset[0] + 80)+'px';
		else 
			_oClsDiv.style.left=(lfoffset[0] + offsetX)+'px';
		if (offsetY == null || offsetY == -1)
			_oClsDiv.style.top=(lfoffset[1])+'px';
		else
			_oClsDiv.style.top=(lfoffset[1] + offsetY)+'px';
		_oClsDiv.style.display='';
		
		if (op == "add") {
			$("txtNewClass4Add").focus();
		} else if (op == "edit") {
			$("txtNewClass4Edit").focus();
		}
		
		/*if(this._oWindowManager == null) {
			this._oWindowManager = new NetEase.JSWindowManager();
		}
		var clsAddWin = this._oWindowManager.showWindow("clsAddWin");
		if (clsAddWin == null) {
			clsAddWin = this._oWindowManager.createWindow("clsAddWin", 
				{title:"添加分类", 
				className:'g_win_0',
				onTop:true,
				width: 250,
				height: 100
				});
			clsAddWin.panel.innerHTML = '<table><tr><td height="80" align="center">'+
									        '<table border="0" cellspacing="4" cellpadding="5">'+
									          	'<tr><td align="left"><input id="txtNewClass" name="txtNewClass" type="text" size="30" maxlength="63"/></td></tr>'+
									          	'<tr><td align="right">'+
									            	'<input id="btnBlogClsOK" type="button" name="submitClassAdd" class="input_button" value="确 定" onclick="' + this._sObjectName+ '.onSubmitClassAdd();">&nbsp;&nbsp;'+
									                '<input id="btnBlogClsCancel" type="button" name="cancelClassAdd" class="input_button" value="取 消" onclick="' + this._sObjectName+ '.onCancelClassAdd();">'+
									            '</td></tr>'+
									        '</table>'+
									    '</td></tr></table>';
			
			clsAddWin.panel.innerHTML = 
				'<div class="g_c_mvdn"><input class="g_w_95" id="txtNewClass" name="txtNewClass" type="text" size="30" maxlength="63" /></div>'+
					'<div class="g_c_vmgin">'+
					'<a class="c g_c_button bd01 butn c05" id="btnBlogClsOK" name="submitClassAdd" onclick="' + this._sObjectName+ '.onSubmitClassAdd();">确　定</a>'+
					'<span>&nbsp;&nbsp;</span>'+
					'<a class="c g_c_button bd01 butn c05" id="btnBlogClsCancel" name="cancelClassAdd" onclick="' + this._sObjectName+ '.onCancelClassAdd();">取　消</a>'+
				'</div>';
			
			this._oWindowManager.showWindow("clsAddWin");
		}		*/
	},
	
	onSubmitClassAdd: function() {	
		var newClass = Trim($("txtNewClass4Add").value);
		if (newClass == "") {
			alert("请输入要添加的分类名称！");
			return false;
		}
		
		$('txtNewClass4Add').value='';
		this.ocClassAddWin();
		//检查分类名称重名
		for (var i = 0; i < this._aClasses.length; i++) {
			if (newClass == this._aClasses[i].className) {
				alert("你已经定义了同名的分类,请选择不同名称!");
				return false;
			}
		}
					
		BlogBean.addClass(newClass, {
			  callback:function(dataFromServer) {
			    this._postClassAdd(dataFromServer, newClass);
			  }.bind(this),
			  errorHandler: function(ex) {
			  	filterWarning(ex, false);
			  	dwrlog('分类添加失败', 'error');
			  }
			});
	},
	
	ocClassAddWin: function() {	
		var _oAddClsDiv = $('addClsDiv');
		if (_oAddClsDiv.style.display == 'none') {
			_oAddClsDiv.style.display='';
		} else {
			_oAddClsDiv.style.display='none';
		}
	},
	
	ocClassEditWin: function() {		
		var _oEditClsDiv = $('editClsDiv');
		if (_oEditClsDiv.style.display == 'none') {
			_oEditClsDiv.style.display='';
		} else {
			_oEditClsDiv.style.display='none';
		}
	},
	
	_postClassAdd: function(clsId, clsName) {
		if (clsId == -1) {
			alert("你已经定义了同名的分类,请选择不同名称!");
			return false;
		}
		
		if (NEBlog != null && NEBlog.gEditBlog != null) {
			NEBlog.gEditBlog.addToClassList(clsId, clsName);
		}
		
			
		// 刷新左侧分类列表
		var clsObj = {id:clsId, className:clsName, blogCount:0};
		this.refreshBlogClasses(clsObj, "a");
	},
	
	
	onCancelClassAdd: function() {	
		
		var _oAddClsDiv = $('addClsDiv');
		_oAddClsDiv.style.display='none';
		$('txtNewClass4Add').value='';
	},
	
	onCancelClassEdit: function() {	
		
		var _oAddClsDiv = $('editClsDiv');
		_oAddClsDiv.style.display='none';
		$('txtNewClass4Edit').value='';
	},
	
	
	onSubmitClassEdit: function() {	
		var newClassId = $("oldClsId").innerHTML;
		var oldClassName;
		var newClassName = Trim($("txtNewClass4Edit").value);
		if (newClassName == "") {
			alert("请输入新的分类名称！");
			return false;
		}
		
		$('txtNewClass4Edit').value='';
		this.ocClassEditWin();
		for (var i = 0; i < this._aClasses.length; i++) {
			if (newClassName == this._aClasses[i].className && newClassId != this._aClasses[i].id) {
				alert("已存在同名分类，请输入其他名称的分类!"  + newClassId + ", " + this._aClasses[i].id);
				return false;
			}
			if (newClassId == this._aClasses[i].id) {
				oldClassName = this._aClasses[i].className;
			}
		}
		
		BlogBean.updateClassByName({id: newClassId, className: newClassName}, oldClassName, {
			callback:function(dataFromServer) {
		    this._postClassEdit(dataFromServer, newClassId, newClassName);
		  }.bind(this),
			errorHandler: function(ex) {
				filterWarning(ex, false);
				dwrlog('分类修改失败', 'error');
			}
		});		
	},
	
		
	_postClassEdit: function(bSucc, clsId, clsName) {
		if (bSucc) {
			this.refreshBlogClasses({id: clsId, className: clsName}, "e");
			if (NEBlog != null && NEBlog.gEditBlog != null) {
				NEBlog.gEditBlog.editInClassList(clsId, clsName);
			}
			dwrlog('分类修改成功', 'ok');
		}
	},
	
	onClassDel: function(clsId, clsName) {
		if (confirm("确定要删除该分类吗？\n删除分类不会删除该分类的日志") == false) {
			return false;
		}
		BlogBean.deleteClass(clsId, clsName, {
			callback:function(dataFromServer) {
		    this._postClassDel(dataFromServer, clsId, clsName);
		  }.bind(this),
			errorHandler: function(ex) {
				dwrlog('分类删除失败', 'error');
			}
		});
	},
	
	_postClassDel: function(bSucc, clsId, clsName) {
		if (bSucc) {
			this.refreshBlogClasses({id: clsId, className: clsName}, "d");
			if (NEBlog != null && NEBlog.gEditBlog != null) {
				NEBlog.gEditBlog.delFromClassList(clsId, clsName);
			}
			dwrlog('分类删除成功', 'ok');
		}
	},
	
	
	keyDownInClass: function(op, e) {	
		var keycode;
		if (isIE)
			keycode = event.keyCode;
		else
			keycode = e.which;
		if (keycode == 13) {//回车
			if (op == 'add')
				this.onSubmitClassAdd();
			else if (op == 'edit')
				this.onSubmitClassEdit();
		}
	},
	
	_sTest4EBL: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBL)
			return;
		switch (sKey) {
			case "LClass":
				this._oTester4EBL.setArray("LClass", vValues);
				break;
			case "LArch":
				this._oTester4EBL.setArray("LArch", vValues);
				break;
			case "LRcntCom":
				this._oTester4EBL.setArray("LRcntCom", vValues);
				break;
		}	
	}
	
}

//end



function YearArchive(year) {
	this.year = year;
	this.archives = [];	
}
function MonthArchive(year, month, count) {
	this.year = year;
	this.month = month;
	this.count = count;
	this.toStandardStr = function() {
		return this.year + '-' + this.month + '-' + '01';
	}
	this.toString = function() { 
		return this.year + '年' + this.month + '月';
	}
}


/**************************************************************
*				163 blog Blog Edit Page				  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0 above,Netscape.)           *
* Created Date: 2007-03-04									  *
* Copyright：1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * 日志编辑发布页面使用的Javascript控制代码
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 */

if (NEBlog==undefined){
	var NEBlog={};
}

/**
 * 全局函数, 日志编辑页面接受插入相片窗口调用的全局函数
 * 此处仅为空函数，由页面初始化时赋值．
 */
function addPhoto(){};

/**
 * 全局变量, 日志编辑页面对象实例, 用于ftl页面访问
 * @type	NEBlog.EditBlog
 */
NEBlog.gEditBlog = null;

/**
 * 全局函数, 创建PermaLinkPage对象实例, ftl页面onload时调用
 * @param	{String}	sServerName				博主的域名
 * @param	{String}	sStyle					博客的样式和图片的地址前缀
 * @param	{String}	sBlogId					此篇blog的id
 * @param	{Number}	iHostId					博主的id
 * @param	{Number}	iCommentRange			每页显示的评论数量
 * @param	{Number}	iCommentCount			此篇博客的评论总数
 * @param	{Number}	iGlobalAllowComment		用户设置的评论全局访问权限 -100表示任何人可评论，0表示登录用户可评论，100表示不可评论，10000表示好友可评论
 * @param	{Number}	iVisitorId				访问者此篇blog的用户id
 * @param	{String}	sVisitorName			访问者的名字(网易通行证ID)
 * @param	{String}	sVisitorNickname		访问者的昵称
 * @param	{String}	sVisitorAvatar			访问者的头像地址
 * @param	{String}	sVisitorIP				访问者的IP
 * @param	{String}	sHostName				博主的hostName, 拼在blog.163前的用户名
 * @param	{String}	sHostPath				博主的hostPath
 * @param	{Number}	iVisitorRank			访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
 * @param	{String}	sBlogTitle				此篇博客标题
 * @param	{String}	sBlogPermalink			博客的静态链接地址, 如: blog/static/66779620070561956531
 * @param	{Number}	iSrl					静态链接后面的唯一的数字串, 如66779620070561956531		
 * @param	{String}	sDivComShowId			页面显示的评论列表显示区的div的id
 * @param	{String}	sDivComPubId			页面显示的评论发布区div的id
 * @param	{String}	sCircleBaseUrl			圈子的serverName
 * @param	{String}	sTestOn					是否进行测试, on或者off
 */
function gLoadEditBlog(sBlogId, sStyle, iCommentRange, iCommentCount, iTrackbackCount, bFromRef, bNewBlog, bPublished, iUserId, sTagOld, sClsId,
				bAbstractSysGen, sPhotoIds, sTestOn) {
	NEBlog.gEditBlog = new NEBlog.EditBlog('NEBlog.gEditBlog', {
		sBlogId: sBlogId, sStyle: sStyle, iCommentRange: iCommentRange, iCommentCount: iCommentCount, iTrackbackCount: iTrackbackCount,
		bFromRef: bFromRef, bNewBlog: bNewBlog, bPublished: bPublished, iUserId: iUserId, sTagOld: processTagUtilForCb(sTagOld.unescape_freemark()), sClsId: sClsId, 
		bAbstractSysGen: bAbstractSysGen, sPhotoIds: sPhotoIds, sTestOn: sTestOn});
	addPhoto = NEBlog.gEditBlog.addPhoto.bind(NEBlog.gEditBlog);
}

NEBlog.EditBlog = Class.create();

NEBlog.EditBlog.sComDivHookId = "_$_blog_edit_com";
NEBlog.EditBlog.sTbDivHookId = "_$_blog_edit_trackback";
NEBlog.EditBlog.sComDivId = "divComs";
NEBlog.EditBlog.sTbDivId = "divTbs";
NEBlog.EditBlog.iAutoSaveInterval = 1000*60*5;//每5分钟自动保存一次

NEBlog.oHtmlEditor = null;

NEBlog.EditBlog.prototype = {
	/**
	 * PrevBlog类构造函数 初始化PrevBlog对象并预设参数
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeft实例对象名字	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft对象
	 * @see 	#_init
	 */
	initialize: function(sObjectName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sBlogId				:	0,
			sStyle				: null,
			iCommentRange	: 10,
			iCommentCount	: 0,
			iTrackbackCount: 0,
			bFromRef			: false,
			bNewBlog			: true,
			bPublished		: true,
			iUserId				: 0,
			iContentMaxLen: 65500,
			sTagOld				: '',
			sClsId				: null,
			bAbstractSysGen: true, 
			sPhotoIds			: '',
			sTestOn				:	'off'
		}, arguments[1]||{});
				
		this._sObjectName = sObjectName;
		
		this.oEditBlogLeft = null;
		
		this._oTester4EB = null;
		
		this._oCommentPager = null;
		
		this.oHtmlEditor = null;
					
		this._bAutoSaved = false;
		
		this._sAutoSaveBlogId = '-1';
				
		this._aTrackbacks = null;
		
		this._aEmbedPhotos = [];	
		
		this._oPhotoWin = null;	
		
		this._init();
		
		return this;
	},
	
	_init: function() {
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EB = new NECtrl.SeleniumTester();
			
			
		$("hint1").style.display = "block";
		if (isIE) 
			$("hint2").style.display = "block";
		
		//设置focus事件
		var focusArray = ['title', 'abstract', 'trackbackurl'];
		attachFocusEvent(focusArray, "input_textbox_bright");
		var focusArray2 = ['editBlogTag'];
		attachFocusEvent2(focusArray2, "input_textbox_bright", showUserAllTags, null);
			
		var editorSrc = '/richTextEditor.do?bid=' + this._oOptions.sBlogId + '&r=' + this._oOptions.bFromRef + '&uid=' + this._oOptions.iUserId;
		
		this.oHtmlEditor = new NECtrl.HtmlEditor(this._oOptions.sBlogId, "edt", {sEditorSrc: editorSrc, sStyle: this._oOptions.sStyle,
					iWidth: 0, iHeight: 350, sObjName: "NEBlog.gEditBlog.oHtmlEditor", iMaxLen: this._oOptions.iContentMaxLen,
					fnPreview: this.toPreview, fnHideDiv:hideUserAllTags, oHideDivParmas:"editBlogTag"});
	
		// 设定一些全局变量
		NEBlog.oHtmlEditor = this.oHtmlEditor;
		
		//CircleBlogPushInfo = new NEBlog.EditBlog.CircleBlogPushInfo();
						
		if(window.attachEvent){	// ie
			document.attachEvent("onclick", function(e){
				var el = event.srcElement;
				
				if(el.id == "editBlogTag"){
					return;
				}else {
					var isClose = true;
					var tmp = el;
					while(tmp){
						if(tmp.id == "showUserTagsDiv_editBlogTag"){
							isClose = false;
							break;
						}
						tmp = tmp.parentNode;
					}
	
					if(isClose)
						hideUserAllTags("editBlogTag");
				}
			});
		}
		
		if(window.addEventListener){	// firefox
			document.addEventListener("click", function(e){
				var el = e.target;
				
				if(el.id == "editBlogTag"){
					return;
				}else {
					var isClose = true;
					var tmp = el;
					while(tmp){
						if(tmp.id == "showUserTagsDiv_editBlogTag"){
							isClose = false;
							break;
						}
						tmp = tmp.parentNode;
					}
					if(isClose)
						hideUserAllTags("editBlogTag");
				}
			},true);
		}
		
		this.oEditBlogLeft = new NEBlog.EditBlogLeft(this._sObjectName+".oEditBlogLeft", this._sObjectName, 
				{sTestOn: this._oOptions.sTestOn, sStyle: this._oOptions.sStyle});
		this._showComments();
		this._showTrackbacks();
		CircleBlogPushInfo.showCircles();
		
		window.setInterval(this._autoSave.bind(this), NEBlog.EditBlog.iAutoSaveInterval);
		
		/*try {
			//Photo.copyPhotos(photoIds,this._postAddPhoto.bind(this));
			Photo.recountAlbumCountInPhoto("_fks_I2i873i02Who5OJaHZkk6Q==", this.aaa.bind(this));
		}catch (ex) {
			alert(ex.message);
		}*/
				
	}, 
	
	_autoSave: function() {
		
		var content = this.oHtmlEditor.getContent();
		if (Trim(content) == "") {
			return false;
		}
		var title = $("title").value;
		var photoIds = '';
		var embedPIds = $("embedPhotoIds").value;
		if (this._oOptions.sPhotoIds != '' && embedPIds != '') {
			photoIds = this._oOptions.sPhotoIds + ";" + embedPIds;
		} else if (this._oOptions.sPhotoIds != '') {
			photoIds = this._oOptions.sPhotoIds;
		} else if (embedPIds != '') {
			photoIds = embedPIds;
		}
		
		BlogBean.autoSaveBlog(content, title, photoIds, !this._bAutoSaved, this._sAutoSaveBlogId, this._oOptions.sBlogId, {
			callback: function(dataFromServer) {
				if (!this._bAutoSaved) {
					this._sAutoSaveBlogId = dataFromServer;
					if (this._sAutoSaveBlogId != '-1')		
						this._bAutoSaved = true;
				}
			}.bind(this)
		});
	},
	
	
	_showComments: function() {
		if (this._oOptions.sBlogId != "") {//编辑blog时才分析模板
			if (this._oOptions.iCommentCount > 0) {//有评论时才显示评论
				$(NEBlog.EditBlog.sComDivId).style.display = "block";
				var loadParam = {sBlogId: this._oOptions.sBlogId};
				var presentParam = {sBlogId: this._oOptions.sBlogId};
				this._newCommentPager(loadParam, presentParam);	
			}
		}	
	}, 
		
	_newCommentPager: function(loadParam, presentParam) {
		this._oCommentPager = new NetEase.CachePage({pageSize: this._oOptions.iCommentRange, prefetch: true, prefetchMulti: 2, markID: "comPageNav", styleDir: this._oOptions.sStyle, totalSize: this._oOptions.iCommentCount,
			loadFunc: this._loadComments, loadParam:loadParam, presentFunc: this._presentComments.bind(this), userPresentFuncParam: presentParam,
			delIterator: this._delComIt});
		this._oCommentPager.nextPage();
	},
	
	_loadComments: function(params, callback) {
		BlogBean.getComments(params.sBlogId, params.limit, params.offset, callback);
	},
	
	_presentComments: function(comments, params) {
		if (comments == null || comments.length == 0) {
			var comDiv = $(NEBlog.EditBlog.sComDivHookId);
			comDiv.style.display = "none";
			if (this._oTester4EB) {
				this._sTest4EB("Com", "null");
			}	
			return;
		}
		
		
		var data = {coms: comments, style: this._oOptions.sStyle, objectName: this._sObjectName};
		$(NEBlog.EditBlog.sComDivHookId).innerHTML = jst_blog_edit_com.processUseCache(data);
		
		if (this._oTester4EB) {
			var _aComId = comments.pluck("id");
			this._sTest4EB("Com", _aComId);
		}	
	},
	
	_delComIt: function(a, b) {
		return (a == b.id);
	},
	
	deleteComment: function(comId) {
		if (confirm("确定要删除该评论吗？") == false) {
			return false;
		}
		$("delcom" + comId).disabled = true;
		BlogBean.deleteComment(comId, this._oOptions.sBlogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteComment(dataFromServer, comId, this._oOptions.sBlogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delcom" + comId).disabled = false;
		  }
		});	
	},
	
	_postDeleteComment: function(succ, commentId, blogId) {
		if (succ == true) {		
			this._oCommentPager.removeOne(commentId);
			var comCount = $("comCount_" + blogId).innerHTML;
			$("comCount_" + blogId).innerHTML = parseInt(comCount) - 1;
			dwrlog('评论删除成功', 'ok');
		} else {
			dwrlog('评论删除失败', 'error');
		}
	},
	
	_showTrackbacks: function()  {
		if (this._oOptions.sBlogId != "") {//编辑blog时才分析模板
			if (this._oOptions.iTrackbackCount > 0) {
				BlogBean.getTrackbacks(this._oOptions.sBlogId, {
				  callback:function(dataFromServer) {
				  	$(NEBlog.EditBlog.sTbDivId).style.display = "block";
				  	//全局缓存引用 
				  	this._aTrackbacks = dataFromServer;		  	
				    this._presentTrackbacks(this._aTrackbacks);
				  }.bind(this)
				});	
			}			
		}		
	},
	
	_presentTrackbacks: function(trackbacks) {	
		if (trackbacks == null || trackbacks.length == 0) {
			var tbsDiv = $("tbs");
			tbsDiv.style.display = "none";
			if (this._oTester4EB) {
				this._sTest4EB("Tb", null);
			}	
			return;
		}
		var data = {tbs: trackbacks, style: this._oOptions.sStyle, tbCount: this._oOptions.iTrackbackCount, objectName: this._sObjectName};
		$(NEBlog.EditBlog.sTbDivHookId).innerHTML = jst_blog_edit_trackback.processUseCache(data);
		
		if (this._oTester4EB) {
			var _aTbId = trackbacks.pluck("id");
			this._sTest4EB("Tb", _aTbId);
		}	
	},
	
	deleteTrackback: function(tbId) {
		if (confirm("确定要删除该引用吗？") == false) {
			return false;
		}
		$("deltb_" + tbId).disabled = true;
		BlogBean.deleteTrackback(tbId, this._oOptions.sBlogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteTrackback(dataFromServer, tbId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("deltb_" + tbId).disabled = false;
		  }
		});	
	},
	
	_postDeleteTrackback: function(succ, tbId) {
		if (succ == true) {		
			var i;
			for (i = 0; i < this._aTrackbacks.length; i++) {
				if (this._aTrackbacks[i].id == tbId) {
					break;	
				}
			}
			this._aTrackbacks.splice(i, 1);
			this._presentTrackbacks(this._aTrackbacks);
			var tbCount = $("tbCount").innerHTML;
			$("tbCount").innerHTML = parseInt(tbCount) - 1;	
			dwrlog('引用删除成功', 'ok');
		} else {
			dwrlog('引用删除失败', 'error');
		}
	},
	
	toPreview: function(content){
		$("previewsubtitle").style.display = "block";
		$("basic").style.display = "none";
		$("edt").style.display = "none";
		$("opt").style.display = "none";
		$("adv").style.display = "none";
		$("hint").style.display = "none";
		$("divComs").style.display = "none";
		$("divTbs").style.display = "none";
		
		//显示预览内容
		var prePad = $("previewpad");
		prePad.innerHTML = content;
		if(isIE)
			prePad.focus();	
		else {
			var previewtab = $("previewtab");
			previewtab.focus();
		}
	},
	
	toEdit: function(){   
		$("previewsubtitle").style.display = "none";
		
		$("basic").style.display = "";
		$("edt").style.display = "";
		$("opt").style.display = "";
		$("adv").style.display = "";
		$("hint").style.display = "";
		if (this._oOptions.iCommentCount > 0) {
			$("divComs").style.display = "";
		}
		if (this._oOptions.iTrackbackCount > 0) {
			$("divTbs").style.display = "";
		}
	},
	
	
	
	//blog分类选择框选中内容发生变化时触发
	changeClass: function(select) {
		if (select.selectedIndex == select.options.length - 1) 
			$("clsName").value = "";
		else
			$("clsName").value = select.options[select.selectedIndex].text;
		if (select.options[select.selectedIndex].value == "") {
			this.oEditBlogLeft.showClsAddDiv("add", "cls", 0, 20);
			select.selectedIndex = 0;
		}
	},
	
	addToClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var oOption = document.createElement("OPTION");
			oSelect.options.add(oOption, 1);
			oOption.text = clsName;
			oOption.value = clsId;
			oSelect.options[1].selected = true;
			$("clsName").value = clsName;
		}	
	},
	
	delFromClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var selIndex = oSelect.selectedIndex;
			for (var i = 0; i < oSelect.options.length; i++) {
				if (oSelect.options[i].value == clsId) {
					oSelect.remove(i);
					if (i == selIndex)
						oSelect.options[0].selected = true;
					break;
				}
			}
		}	
	},
	
	editInClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var selIndex = oSelect.selectedIndex;
			for (var i = 0; i < oSelect.options.length; i++) {
				if (oSelect.options[i].value == clsId) {
					oSelect.options[i].text = clsName;
					if (i == selIndex)
						$("clsName").value = clsName;
					break;
				}
			}
		}	
	},
	
	
	onPublish: function() {
		var pubbtn = $("pubbtns");
		pubbtn.className = "g_disable";
		var draftbtn = $("draftbtns");
		var draftOrigClass = draftbtn.className;
		draftbtn.className = "g_disable";
		//检查输入的字段
		if (this._checkField(this._oOptions.bAbstractSysGen) == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		if (this._processTag() == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		if (this._processTrackback() == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		//processPic();
			
		var action;
		if (this._oOptions.bNewBlog == 1) {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=1&n=1&c=0";//发布&新建&原先不存在cbmap对应关系
			} else {
				action = UD.hostPath + "/editBlog.do?p=1&n=1&c=1";//发布&新建&原先存在cbmap对应关系
			}
		} else {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=1&n=0&c=0";//发布&更新&原先不存在cbmap对应关系
			} else {
				action = UD.hostPath + "/editBlog.do?p=1&n=0&c=1";//发布&更新&原先存在cbmap对应关系
			}
		}
	
		action += "&autoid=" + this._sAutoSaveBlogId;
		document.forms['editorForm'].action = action;
		document.forms['editorForm'].submit();
	},
	
	onSaveDraft: function() {	
		var draftbtn = $("draftbtns");
		draftbtn.className = "g_disable";
		var pubbtn = $("pubbtns");
		var pubOrigClass = pubbtn.className;
		pubbtn.className = "g_disable";
		//检查输入的字段
		if (this._checkField(this._oOptions.bAbstractSysGen) == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}
		
		if (this._processTag() == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}	
		
		if (this._processTrackback() == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}
		
		//processPic();
		
		var action;	
		if (this._oOptions.bNewBlog == 1) {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=0&n=1&c=0";//存草稿&新建&原先不存在cbmap对应关系
			} else {
				action = UD.hostPath + "/editBlog.do?p=0&n=1&c=1";//存草稿&新建&原先存在cbmap对应关系
			}
		} else {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=0&n=0&c=0";//存草稿&更新&原先不存在cbmap对应关系
			} else {
				action = UD.hostPath + "/editBlog.do?p=0&n=0&c=1";//存草稿&更新&原先存在cbmap对应关系
			}
		}
		action += "&autoid=" + this._sAutoSaveBlogId;
		document.forms['editorForm'].action = action;
		document.forms['editorForm'].submit();
	},
	
	onCancel: function(hostName) {
		document.forms['editorForm'].action = "editBlogAll.do?host=" + hostName;
		document.forms['editorForm'].submit();
	},
	
	_checkField: function(abstractSysGen) {
		var input = document.forms['editorForm'].getElementsByTagName("INPUT");
		
		for (var i = 0; i < input.length; i++) {
			if (input[i].name == 'title') {
				var value = Trim(input[i].value);
				if (value == '') {
					showInfo("submithint", "请输入标题！", "info");
					return false;
				}
				/*if (containsIllegalChar(value)) {
					alert("标题包含非法字符，不能有引号和斜杠！");
					return false;
				}*/
			}			
		}
		
		//获取正文编辑器的内容并作有害代码过滤
		var content = this.oHtmlEditor.getContent();
		//把日志内容保存到剪贴板
		if (isIE){
			window.clipboardData.setData("Text", content);		
		}
		
		if (this.oHtmlEditor.IsExceedMaxLen()) {
			alert("日志内容超过最大字数" + this._oOptions.iContentMaxLen + "，请重新编辑后提交");
			return false;
		}
		
		if (this.oHtmlEditor.hasHarmCode()) {
			alert("日志内容包含有害代码，已经被过滤，请编辑后重新提交！");
			return false;
		}
		
		this._genAbstract(content, abstractSysGen);
		
		var submitAbstract = $("absGen").value;
		var stripedAbstract = stripData(submitAbstract, "");
		if (stripedAbstract.isHarm) {
			$("absGen").value = stripedAbstract.content;
			$("abstract").value = stripedAbstract.content;
			alert("日志摘要包含有害代码，已经被过滤，请编辑后重新提交！");
			return false;
		}		
	},
	
	_genAbstract: function(content, abstractSysGen) {
		//检查摘要	
		var abs = $("abstract");
		if (abs != null) {
			var absvalue = Trim(abs.value);
			if (abstractSysGen == 1) {
				if (absvalue == "") {
					//var content = extractHtmlText(content);
					//$("absGen").value = content.substr(0, 255);
					$("absGen").value = "";
				} else {
					$("absGen").value = absvalue;
					$("absSysGen").value = 0;
				}
			} else if (abstractSysGen == 0) {
				if (absvalue == "") {
					/*var content = extractHtmlText(content);
					$("absGen").value = content.substr(0, 255);
					$("absSysGen").value = 1;*/
					$("absGen").value = "";
					$("absSysGen").value = 1;
				} else {
					$("absGen").value = absvalue;
				}
			}
		}	
	},
	
	
	 _processTag: function() {
		//对用户输入的tag作去重和整理操作
		var tags = $("editBlogTag").value;
		/*if (containsIllegalChar(tags)) {
			alert("标签包含非法字符，不能有引号和斜杠！");
			return false;
		}*/
	
		//added by mml
		//去掉引号 
		tags = processTagString(tags);
		tags = processTagUtilForCb(tags);	
			
		var tagInfoTemp = new Object();
		tagInfoTemp.numJoin = 0;
		tagInfoTemp.tags = tags;
		//处理得到需要自动添加到用户tag库的新tag
		procTagsUtil(tagInfoTemp);
	//	$("numJoin").value = tagInfoTemp.numJoin;
		//产生引号 
		$("processedTag").value = structQuotedTag(tagInfoTemp.tags.split(","));
		
		//产生增加、删除tag字符串
		var tagInfoTemp1 = new Object();
		tagInfoTemp1.addTags = "";
		tagInfoTemp1.delTags = "";
		getAddDelTags(tagInfoTemp1, this._oOptions.sTagOld, tagInfoTemp.tags);
		
		//产生引号 
		//此blog需要新增的tag
	//	$("addTags").value = structQuotedTag(tagInfoTemp1.addTags.split(","));
		//此blog需要删除的tag
	//	$("delTags").value = structQuotedTag(tagInfoTemp1.delTags.split(","));
		
		return true;
	},
	
	
	_processTrackback: function() {
		//把引用地址去重，统一使用英文分号
		var tb = $("trackbackurl");
		var newtb = "";
		if (tb != null) {
			var tbv = Trim(tb.value);
			if (tbv != "") {
				var regexp = /[;；]/;
				var tbs = tbv.split(regexp);
				tbs = removeSameEl(tbs);
				for (var i = 0; i < tbs.length; i++) {
					newtb += tbs[i];
					if (i < tbs.length - 1)
						newtb += ";";
				}
			}
		}
		if (newtb != "") {
			$("refurl").value = newtb;
		}
		
		return true;
	},
	
	switchTrackback: function() {
		if ($('openTB').value == 0) {	
			var Obj = {success: false};
			new Effect.BlindDown('tbinfo', {stateId: "tbinfo" + "_$$S$$", succObj: Obj, duration:0.1});
			
			if (Obj.success) {
				$('openTB').value = 1;	
				$('tbHead').className = $('tbHead').className.replace("i128", "i127");
			}
			else
				$('openTB').value = 0;
			
		} else {
			var Obj = {success: false};
			new Effect.BlindUp('tbinfo', {stateId: "tbinfo" + "_$$S$$", succObj: Obj, duration:0.1});
				
			if (Obj.success) {
				$('openTB').value = 0;	
				$('tbHead').className = $('tbHead').className.replace("i127", "i128");
			}
			else
				$('openTB').value = 1;
		}
	},
	
	switchAbstract: function() {
		if ($('openAbstract').value == 0) {	
			var Obj = {success: false};
			new Effect.BlindDown('abstractinfo', {stateId: "abstractinfo" + "_$$S$$", succObj: Obj, duration:0.1});
			
			if (Obj.success) {
				$('openAbstract').value = 1;	
				$('absHead').className = $('absHead').className.replace("i128", "i127");
			}
			else
				$('openAbstract').value = 0;
			
		} else {
			var Obj = {success: false};
			new Effect.BlindUp('abstractinfo', {stateId: "abstractinfo" + "_$$S$$", succObj: Obj, duration:0.1});
				
			if (Obj.success) {
				$('openAbstract').value = 0;	
				$('absHead').className = $('absHead').className.replace("i127", "i128");
			}
			else
				$('openAbstract').value = 1;
		}
	},
	
	openAddPhotoWin: function() {
		if (photolistTemplate == null)
			photolistTemplate = createJSTAndParse("photolist_jst", photolist_jst);	
		if (isIE){
			//var	photolist = window.showModalDialog("uploadBlogPhoto.do","","dialogHeight: 520px; dialogWidth: 790px; resizable: no; status: yes;scroll:no;"); 
			this._oPhotoWin = window.open("uploadBlogPhoto.do","","resizable=no,scrollbars=no,status=yes, width=785px, height=470px"); 
			//addPhoto(photolist);
		}
		else
			this._oPhotoWin = window.open("uploadBlogPhoto.do", "", "resizable=no,scrollbars=no,status=yes, width=785px, height=470px");
	},
	
	
	
	/*addPhoto: function(photolist, callback) {
		if (photolist == null)
			return false;
		var photoIds = [];
		for (var i = 0; i < photolist.length; i++) {
			photoIds.push(photolist[i].id);
		}
		Photo.copyPhotos(photoIds, {
			callback: function(dataFromServer) {
				callback();
		    this._postAddPhoto(dataFromServer, photolist);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	callback();
				alert("插入图片出错！");
		  }
		});
	},*/
	
	
	addPhoto: function(photolist) {			
		photolist.each(function(e){
			var photoId = e.mediumUrl.substring(e.mediumUrl.lastIndexOf("/") + 1, e.mediumUrl.lastIndexOf(".jpg"));
			if (this._aEmbedPhotos.detect(function(e){return e == photoId;}) == null) {
				this._aEmbedPhotos.push(photoId);
			}
			if (isIE) {
				this.oHtmlEditor.designEditor.focus();//必须获得焦点，否则图片会插入到外面
				//this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<a href="http://' + DomainMap.getParentDomain(UD.hostName) + '/album/prevPhoto.do?photoId=' + e.id + '" target="_blank"><img src="' + e.mediumUrl + '" /></a>') ; 
				this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<a href="' + e.mediumUrl + '" target="_blank"><img src="' + e.mediumUrl + '" /></a>') ; 
			}
			else {
				this.oHtmlEditor.designEditor.focus();//必须获得焦点
				var insertRangeObj = this.oHtmlEditor.designEditor.getSelection().getRangeAt(0);
				insertRangeObj.deleteContents();
				var newA = this.oHtmlEditor.designEditor.document.createElement("a");
				//newA.href = "http://" + DomainMap.getParentDomain(UD.hostName) + "/album/prevPhoto.do?photoId=" + e.id;
				newA.href = e.mediumUrl;
				newA.target = "_blank";
				var newImg = this.oHtmlEditor.designEditor.document.createElement("img");
				newImg.src = e.mediumUrl;
				newA.appendChild(newImg);
				insertRangeObj.insertNode(newA);
			}
		}.bind(this));	
		
		$("embedPhotoIds").value = this._aEmbedPhotos.toArray().join(";");

	},
	
	addRemotePhoto: function(photolist) {
		if (photolist == null)
			return false;
		photolist.each(function(e){ 
			ie = (document.all)? true:false
			if (ie) {
				this.oHtmlEditor.designEditor.focus();//必须获得焦点，否则图片会插入到外面
				this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<img src="' + e + '" />') ; 
			}
			else {
				this.oHtmlEditor.designEditor.focus();//必须获得焦点
				var insertRangeObj = this.oHtmlEditor.designEditor.getSelection().getRangeAt(0);
				insertRangeObj.deleteContents();
				var newImg = this.oHtmlEditor.designEditor.document.createElement("img");
				newImg.src = e;
				insertRangeObj.insertNode(newImg);
			}
		}.bind(this));	
	},
	
	
	
	_sTest4EB: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EB)
			return;
		switch (sKey) {
			case "PushCircle":
				this._oTester4EB.setArray("PushCircle", vValues);
				break;
			case "PushedCircle":
				this._oTester4EB.setArray("PushedCircle", vValues);
				break;
			case "Com":
				this._oTester4EB.setArray("Com", vValues);
				break;
			case "Tb":
				this._oTester4EB.setArray("Tb", vValues);
				break;
		}	
	}
}



var CircleBlogPushInfo={
    pushedCircles: [],
    notPushedCircles: [],
    circleType1s: [],
    init: function(blogId, profileId){
        CircleBlogPushInfo.blogId=blogId;
        CircleBlogPushInfo.profileId=profileId;
    },
    getTypesWithCircles: function(){
        var userCircleType1s=CircleBlogPushInfo.getUserCircleType1s();
        var circleIndex=0;
        for (var i=0; i<userCircleType1s.length; i++){
           var type1Circles=CircleBlogPushInfo.getCirclesByType1(userCircleType1s[i].id);
           type1Circles.each( function(circle){
                circle.index=circleIndex++;
           });
           userCircleType1s[i].circles=type1Circles;
        }
        return userCircleType1s;
    },
    showCircles: function(){
        var circleType1s=CircleBlogPushInfo.getTypesWithCircles();
        if (circleType1s.length<=0){
            return;
        }
        Element.show("circleBlogPushDiv");
        var modle={circleType1s: circleType1s, circleBaseUrl: CircleBlogPushInfo.circleBaseUrl};
        ActionMapping.forward(modle, "type1CirclesDiv", "type1Circles_jst");
    },
    _enableCircleCheckbox: function(disabled){
        var userCircleType1s=CircleBlogPushInfo.getUserCircleType1s();
        for (var i=0; i<userCircleType1s.length; i++){
           var type1Circles=CircleBlogPushInfo.getCirclesByType1(userCircleType1s[i].id);
           type1Circles.each( function(circle){
                $("circleId"+circle.index).disabled=disabled;
           });
        }
    },
    enable: function(){
        if (!CircleBlogPushInfo.isBlogCanPushed()){
            return;
        }
        CircleBlogPushInfo._enableCircleCheckbox(false);
        //Element.show("type1CirclesDiv");
    },
    disable: function(){
        if (!CircleBlogPushInfo.isBlogCanPushed()){
            return;
        }
        CircleBlogPushInfo._enableCircleCheckbox(true);
        //$("circleType1Id").disabled=true;
        //Element.hide("type1CirclesDiv");
    },
    isBlogPushedBefore: function(){
       return (CircleBlogPushInfo.pushedCircles.length!=0);
    },
    isBlogCanPushed: function(){
       if (CircleBlogPushInfo.notPushedCircles.length==0){
            return false;
       }
       var pushedType1Id=CircleBlogPushInfo.getPushedCircleType1Id();
       //已被某个类别推送过了, 就不能推送到其它类别了. 所以如果不存在同类别的圈子就没必要显示了
       if (pushedType1Id>0 && CircleBlogPushInfo.getCirclesByType1(pushedType1Id).length<=0){
            return false;
       }
       return true;
    },
    addPushedCircle: function(id, urlName, name, circleType1Id){
        CircleBlogPushInfo.pushedCircles.push({id: id, urlName: urlName, name: name, circleType1Id: circleType1Id});
    },
    getPushedCircleType1Id: function(){
        if (CircleBlogPushInfo.pushedCircles.length==0){
            return -1;
        }
        var circleType1Id=CircleBlogPushInfo.pushedCircles[0].circleType1Id;
        return circleType1Id;
    },
    addCircle: function(id, urlName, name, circleType1Id){
        CircleBlogPushInfo.notPushedCircles.push({id: id, urlName: urlName, name: name, circleType1Id: circleType1Id});
    },
    addCircleType1: function(id, name){
        CircleBlogPushInfo.circleType1s.push({id:id, name:name});
    },
    getCircleType1ById: function(id){
        var circleType1=CircleBlogPushInfo.circleType1s.find ( function(circleType1){
            return circleType1.id==id;
        });
        return circleType1;
    },
    getCirclesByType1: function(type1Id){
        var circles=CircleBlogPushInfo.notPushedCircles.findAll( function(curCircle){
            return curCircle.circleType1Id==type1Id;
        });
        return circles;
    },
    getUserCircleType1s: function(){
        var userCircleType1s=[];
        CircleBlogPushInfo.notPushedCircles.each( function(circle){
            var findCircleType1=userCircleType1s.find( function(circleType1){
                return circleType1.id==circle.circleType1Id;
            });
            if (findCircleType1==null){
                userCircleType1s.push(CircleBlogPushInfo.getCircleType1ById(circle.circleType1Id));
            }
        });
        return userCircleType1s;
    }
}

//end









//begin

if (NEBlog==undefined){
	var NEBlog={};
}

NEBlog.gEditBlogAll = null;

function gLoadEditBlogAll(sStyle, iTotalBlogCount, iBlogRange, iCommentRange, sBy, sById, iByCnt, sTestOn) {
	NEBlog.gEditBlogAll = new NEBlog.EditBlogAll('NEBlog.gEditBlogAll', {
		sStyle: sStyle, sTestOn: sTestOn, iTotalBlogCount: iTotalBlogCount, iBlogRange: iBlogRange, iCommentRange: iCommentRange,
		sBy: sBy, sById: sById, iByCnt: iByCnt});
}

NEBlog.EditBlogAll = Class.create();

NEBlog.EditBlogAll.sBlogDivId = "_$_blog_edit_list";
NEBlog.EditBlogAll.sComDivId = "_$_com_editall_";
NEBlog.EditBlogAll.sTbDivId = "_$_tb_editall_";

NEBlog.EditBlogAll.prototype = {
	initialize: function(sObjectName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// 测试开关on或者off	
			sStyle  			:	null,		// 日志的样式地址前缀
			iTotalBlogCount:	0,
			iBlogRange		:	10,
			iCommentRange	: 10,
			sBy						: -1,
			sById					: null,
			iByCnt				: 0
			
		}, arguments[1]||{});
		
		this._sObjectName = sObjectName;
		
		this.oEditBlogLeft = null;
		
		this._oTester4EBA = null;
		
		this._oBlogPager = null;
		
		this._aCommentPager = new Array(this._oOptions.iBlogRange);
		
		this._aTrackbacks = new Array(this._oOptions.iTotalBlogCount);
		
		this._init();
		
		return this;
	},

	_init: function() {
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBA = new NECtrl.SeleniumTester();
			
		this.oEditBlogLeft = new NEBlog.EditBlogLeft(this._sObjectName+".oEditBlogLeft", this._sObjectName, 
				{sTestOn: this._oOptions.sTestOn, sStyle: this._oOptions.sStyle, sSel: this._oOptions.sBy, sSelId: this._oOptions.sById});	
		if (this._oOptions.sBy == -1)
			this._showBlogs();		
		else {//从editBlog页面跳转过来
			if (this._oOptions.sBy == "cls") {
				this.openBlogsByClass(this._oOptions.sById, null, this._oOptions.iByCnt);
			
			}　else if(this._oOptions.sBy = "arch") {
				this.openBlogsByArchive(this._oOptions.sById, null, this._oOptions.iByCnt);
			}	
		}
		
	},
	
	_showBlogs: function() {		
		var loadParam = {loadType:"all"};
		var presentParam = {loadType:"all"};
		this._newBlogPager(this._oOptions.iTotalBlogCount, loadParam, presentParam);
	
	}, 
	
	_loadBlogs: function(params, callback) {
		if (params.loadType == "class") {
			BlogBean.getBlogsByClass(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, params.classId, callback);
			if (params.className != null)
				$("loadType").innerHTML = "分类:" + params.className;
		} else if (params.loadType == "archive") {
			BlogBean.getBlogsByArchive(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, params.archDate, callback);
			if (params.archStr != null)
				$("loadType").innerHTML = "存档:" + params.archStr;
		} else if (params.loadType == "all") {
			BlogBean.getBlogs(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, callback);
			$("loadType").innerHTML = "所有日志";
		} else {
			BlogBean.getBlogs(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, callback);
			$("loadType").innerHTML = "所有日志";
		}			
	},
	
	_presentBlog: function(blogs, params) {
		var data = {blogs: blogs, style: this._oOptions.sStyle, loadType: params.loadType, hostPath: spaceStaticData.hostPath, objectName: this._sObjectName};		
	
		$(NEBlog.EditBlogAll.sBlogDivId).innerHTML = jst_blog_edit_list.processUseCache(data);

		
		if (this._oTester4EBA) {
			if (blogs == null || blogs.length == 0) {
				this._sTest4EBA("Blog", "null");
			} else {
				var _aBId = blogs.pluck("id");
				this._sTest4EBA("Blog", _aBId);
			}
		}
	},
	
	_newBlogPager: function(blogCount, loadParam, presentParam) {
		this._oBlogPager = new NetEase.PageNumber({pageSize: this._oOptions.iBlogRange, markID: "blogPageNav:blogPageNav2", totalSize: blogCount,
			loadFunc: this._loadBlogs, loadParam:loadParam, presentFunc: this._presentBlog.bind(this), userPresentFuncParam: presentParam, needRefreshAfterUpdate:false,
			delIterator: this._delBlogIt, updateIterator: this._udtBlogIt, beforeID: "blogPageNav2", beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop,
			beforeChange:this._scrollToBlogTop});
		this._oBlogPager.show();	
	},
	
	_delBlogIt: function(a, b) {
		return (a == b.id);
	},
	
	_udtBlogIt: function(a, b) {
		return (a.id == b.id);
	},
	
	_scrollToBlogTop: function() {
		new Effect.ScrollTo(NEBlog.EditBlogAll.sBlogDivId, {duration:0.0});//自动对齐
	},
	
	openBlogsAll: function(blogCount) {
		var loadParam = {loadType:"all"};
		var presentParam = {loadType:"all"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	openBlogsByClass: function(classId, className, blogCount) {
		if (blogCount == 0 && this._oBlogPager != null) {
			this._presentBlog(null, {loadType:"class", className: className});
			this._oBlogPager.reset();
			$("loadType").innerHTML = "分类:" + className;
			return;
		}
		
		var loadParam = {loadType:"class", classId: classId, className: className};
		var presentParam = {loadType:"class"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	openBlogsByArchive: function(archDate, archStr, blogCount) {
		if (blogCount == 0 && this._oBlogPager != null) {
			this._presentBlog(null, {loadType:"archive", archStr: archStr});
			this._oBlogPager.reset();
			$("loadType").innerHTML = "存档:" + archStr;
			return;
		}
		
		var loadParam = {loadType:"archive", archDate: archDate, archStr: archStr};
		var presentParam = {loadType:"archive"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	deleteBlog: function(blogId, isPublished, valid, publishTime, allowView, classId) {		
		if ($("delblog_" + blogId).disabled == true)
			return false;
		if (confirm("确定要删除该日志吗？") == false) {
			return false;
		}
		this._doDeleteBlog(blogId, isPublished, valid, publishTime, allowView, classId);
	},
	
	_doDeleteBlog: function(blogId, isPublished, valid, publishTime, allowView, classId) {
		$("delblog_" + blogId).disabled = true;
		var p = false;
		if (isPublished == 1 && valid < 12)
			p = true;
		var archiveDate = new Date(publishTime);
		archiveDate.setDate(1);
		archiveDate.setHours(0);
		archiveDate.setMinutes(0);
		archiveDate.setSeconds(0);
		archiveDate.setMilliseconds(0);
		BlogBean.deleteBlog(blogId, p, publishTime, allowView, {
		  callback:function(dataFromServer) {
		    this._postDeleteBlog(dataFromServer, blogId, classId, archiveDate.getTime(), p);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delblog_" + blogId).disabled = false;
		  	
		  	if (ex == undefined || ex == null ||
						ex.type != "DelSysRecomException") {
					return false;
				}
				
				alert("该日志已经被系统推荐, 不能删除!");
		  }
		});
	},
	
	_postDeleteBlog: function(succ, blogId, classId, archiveDate, isPublished) {
		if (succ == true) {
			this._oBlogPager.removeOne(blogId);
			for(var i = 0; i < this.oEditBlogLeft._aClasses.length; i++) {				
				if (this.oEditBlogLeft._aClasses[i].id == classId) {
					this.oEditBlogLeft._aClasses[i].blogCount -= 1;
					if (isPublished) {
						this.oEditBlogLeft._aClasses[i].publishedBlogCount -= 1;
					}
					break;
				}
			}
			this.oEditBlogLeft._showBlogClasses(this.oEditBlogLeft._aClasses);
			
			for(var i = 0; i < this.oEditBlogLeft._aArchives.length; i++) {				
				if (this.oEditBlogLeft._aArchives[i].archiveDate == archiveDate) {
					this.oEditBlogLeft._aArchives[i].blogCount -= 1;
					if (isPublished) {
						this.oEditBlogLeft._aArchives[i].publishedBlogCount -= 1;
					}
					break;
				}
			}		
			this.oEditBlogLeft._showArchives(this.oEditBlogLeft._aArchives);
			
			if (this.oEditBlogLeft._aRcntComments != null && this.oEditBlogLeft._aRcntComments.length > 0) {
				this.oEditBlogLeft._aRcntComments = this.oEditBlogLeft._aRcntComments.reject(function(e) {
					return e.blogId == blogId;
				});				
				this.oEditBlogLeft._showRecentComments(this.oEditBlogLeft._aRcntComments);
			}
			dwrlog('日志删除成功', 'ok');
		} else {
			dwrlog('日志删除失败', 'error');
		}	
	},
	
	_loadComments: function(params, callback) {
		BlogBean.getComments(params.blogId, params.limit, params.offset, callback);
	},

	_presentComments: function(comments, params) {
		if (comments == null || comments.length == 0) {
			var comDiv = $("blogshowcomment_" + params.blogId);
			comDiv.style.display = "none";
			if (this._oTester4EBA) {
				this._sTest4EBA("Com", "null");
			}
			return;
		}
		
		//new Effect.ScrollTo("comDiv_" + params.blogId, {duration:0.0});// 滚动到模块首部
		
		var comDiv = $(NEBlog.EditBlogAll.sComDivId + params.blogId);
		if (comDiv.style.display == "none") {
			var data = {comments: comments, style: this._oOptions.sStyle, blogId: params.blogId, objectName: this._sObjectName};
			comDiv.innerHTML = jst_blog_com_editall.processUseCache(data);
			this._upDownComments(params.blogId);	
			$('open_' + params.blogId).value = 1;
		} else {
			var data = {comments: comments, style: this._oOptions.sStyle, blogId: params.blogId, objectName: this._sObjectName};
			
			
			comDiv.innerHTML = jst_blog_com_editall.processUseCache(data);
		}
			
		if (this._oTester4EBA) {
			var _aCId = comments.pluck("id");
			this._sTest4EBA("Com", _aCId, params.blogId);
		}
	},

	_openComments: function(blogId, commentCount) {
		var loadParam = {blogId: blogId};
		var presentParam = {blogId: blogId, commentCount: commentCount};
		this._newCommentPager(blogId, commentCount, loadParam, presentParam);
	},
	
	
	_newCommentPager: function(blogId, commentCount, loadParam, presentParam) {	
		this._aCommentPager[blogId] = new NetEase.CachePage({pageSize: this._oOptions.iCommentRange, prefetch: true, prefetchMulti: 2, markID: "comPageNav_"+blogId, styleDir: this._oOptions.sStyle, totalSize: commentCount,
			loadFunc: this._loadComments.bind(this), loadParam:loadParam, presentFunc: this._presentComments.bind(this), userPresentFuncParam: presentParam,
			delIterator: this._delComIt});
		this._aCommentPager[blogId].nextPage();
	},
	
	_delComIt: function(a, b) {
		return (a == b.id);
	},
	
	switchComments: function(blogId, comCount) {
		if(document.getElementById('ul_' + blogId) == null) {
			this._openComments(blogId, comCount);		
		}
		else {
			this._upDownComments(blogId);
		}
	},
	
	_upDownComments: function(blogId) {
		if($('open_' + blogId).value == 0) { //评论模块关闭，该处将打开评论模块
			var Obj = {success: false};
			$("comPageNav_" + blogId).style.display = "";
			new Effect.BlindDown(NEBlog.EditBlogAll.sComDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
			
			if (Obj.success) {
				$('open_' + blogId).value = 1;	
				var img = $("imgCom" + blogId);
				img.className = img.className.replace("i128", "i127");
			}
			else
				$('open_' + blogId).value = 0;	
		}
		else { //评论模块打开，该处将其关闭
			var Obj = {success: false};
			$("comPageNav_" + blogId).style.display = "none";
			new Effect.BlindUp(NEBlog.EditBlogAll.sComDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
				
			if (Obj.success) {
				$('open_' + blogId).value = 0;	
				var img = $("imgCom" + blogId);
				img.className = img.className.replace("i127", "i128");
			}
			else
				$('open_' + blogId).value = 1;
		}
	},
	
	deleteComment: function(comId, blogId) {
		if (confirm("确定要删除该评论吗？") == false) {
			return false;
		}
		$("delcom_" + comId).disabled = true;
		BlogBean.deleteComment(comId, blogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteComment(dataFromServer, comId, blogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delcom_" + comId).disabled = false;
		  }
		});	
	},
	
	_postDeleteComment: function(succ, commentId, blogId) {
		if (succ == true) {		
			this._aCommentPager[blogId].removeOne(commentId);		
			var comCount = $("comCount_" + blogId).innerHTML;
			var newCount = parseInt(comCount) - 1;
			$("comCount_" + blogId).innerHTML = newCount;
			var obj = {};
			obj.id = blogId;
			obj.commentCount = newCount;
			this._oBlogPager.updateOne(obj);
			
						
			if (this.oEditBlogLeft._aRcntComments != null && this.oEditBlogLeft._aRcntComments.length > 0) {
				this.oEditBlogLeft._aRcntComments = this.oEditBlogLeft._aRcntComments.reject(function(e) {
					return e.id == commentId;
				});				
				this.oEditBlogLeft._showRecentComments(this.oEditBlogLeft._aRcntComments);
			}
			dwrlog('评论删除成功', 'ok');
		} else {
			dwrlog('评论删除失败', 'error');
		}
	},
	
	switchTrackback: function(blogId) {	
		if($('ulTrackback_' + blogId) == null) {	
			if (this._aTrackbacks !=null && this._aTrackbacks[blogId] != null) {//已经在缓存中
				this._showTrackbacks(this._aTrackbacks[blogId], blogId);
			} else {		
				BlogBean.getTrackbacks(blogId, {
				  callback:function(dataFromServer) {
				  	//全局缓存引用
				  	this._aTrackbacks[blogId] = dataFromServer;
				    this._showTrackbacks(dataFromServer, blogId);
				  }.bind(this)
				});	
			}	
		}
		else {
			this._upDownTrackbacks(blogId);
		}
	},
	
	_upDownTrackbacks: function(blogId) {
		if($('open2_' + blogId).value == 0) { //评论模块关闭，该处将打开评论模块
			var Obj = {success: false};
			new Effect.BlindDown(NEBlog.EditBlogAll.sTbDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
			
			if (Obj.success) {
				$('open2_' + blogId).value = 1;	
				var img = $("imgTb" + blogId);
				img.className = img.className.replace("i128", "i127");
			}
			else
				$('open2_' + blogId).value = 0;	
		}
		else { //评论模块打开，该处将关闭其
			var Obj = {success: false};
			new Effect.BlindUp(NEBlog.EditBlogAll.sTbDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
				
			if (Obj.success) {
				$('open2_' + blogId).value = 0;	
				var img = $("imgTb" + blogId);
				img.className = img.className.replace("i127", "i128");
			}
			else
				$('open2_' + blogId).value = 1;
		}
	},
	
	_showTrackbacks: function(tbsList, blogId) {
		if (tbsList == null || tbsList.length == 0) {
			var tbsDiv = $("tbsdiv_" + blogId);
			tbsDiv.style.display = "none";
			if (this._oTester4EBA) {
				this._sTest4EBA("Tb", "null");
			}
			return;
		}
		
		var data = {trackbacks:tbsList, blogId:blogId, style: this._oOptions.sStyle, objectName: this._sObjectName};
		
		var tbDiv = $(NEBlog.EditBlogAll.sTbDivId + blogId);
		tbDiv.innerHTML = jst_blog_editall_trackback.processUseCache(data);
		if (tbDiv.style.display == "none") {
			this._upDownTrackbacks(blogId);	
			$('open2_' + blogId).value = 1;
			var img = $("imgTb" + blogId);
				img.className = img.className.replace("i128", "i127");
		}
		
		if (this._oTester4EBA) {
			var _aTId = tbsList.pluck("id");
			this._sTest4EBA("Tb", _aTId, blogId);
		}
	},
	
	deleteTrackback: function(tbId, blogId) {
		if (confirm("确定要删除该引用吗？") == false) {
			return false;
		}
		$("deltb_" + tbId).disabled = true;
		BlogBean.deleteTrackback(tbId, blogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteTrackback(dataFromServer, tbId, blogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("deltb_" + tbId).disabled = false;
		  }
		});	
	},
	
	_postDeleteTrackback: function(succ, tbId, blogId) {
		if (succ == true) {
			var i;
			for (i = 0; i < this._aTrackbacks[blogId].length; i++) {
				if (this._aTrackbacks[blogId][i].id == tbId) {
					break;	
				}
			}
			this._aTrackbacks[blogId].splice(i, 1);
			this._showTrackbacks(this._aTrackbacks[blogId], blogId);
			var tbCount = $("tbCount_" + blogId).innerHTML;
			$("tbCount_" + blogId).innerHTML = parseInt(tbCount) - 1;
			dwrlog('引用删除成功', 'ok');
		} else {
			dwrlog('引用删除失败', 'error');
		}
	},
	
	
	_sTest4EBA: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBA)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4EBA.setArray("Blog", vValues);
				break;
			case "Com":
				this._oTester4EBA.set2DArray("Com", vValues, "Blog", sRelValue);
				break;
			case "Tb":
				this._oTester4EBA.set2DArray("Tb", vValues, "Blog", sRelValue);
				break;
			case "Class":
				this._oTester4EBA.setArray("Class", vValues);
				break;
		}	
	}
	
}

//end


var ActionMapping={
  forward: function(model, view, template){
     Logger.debug("ActionMapping  model: "+$H(model).inspect()+" view:"+view+" template:"+template);
      var result = TrimPath.processDOMTemplate(template, model);
      if (template=="type1Circles_jst"){
        Logger.debug(result);
      }
      $(view).innerHTML=result;	  
  },

  redirect: function(url){
    window.location=url;
  }
}


var PopDialog={
    pageLayer: new NetEase.PageLayer(),
	_show: function(model, view, template, baseElement, offset, options){ //显示弹出对话框, baseElement是基准的元素, offset是偏移量
		var htmlStr=TrimPath.processDOMTemplate(template, model);
        PopDialog.showDialog(htmlStr, view, baseElement, offset, options);
	},
    showDialog: function(htmlStr, view, baseElement, offset, options){
        var viewElement=$(view);
        viewElement.innerHTML=htmlStr;
        var baseElementPos=Position.cumulativeOffset($(baseElement));
        var dialogLeft=baseElementPos[0]+offset.left;
        var dialogTop=baseElementPos[1]+offset.top;
        if (options!=null && options.adjustPos==true){
        	if (dialogLeft+options.width>990){
        		dialogLeft-=options.width;
        	}
        }
        var dialogStyle= {left:dialogLeft+"px", top:dialogTop+"px"};
        Element.setStyle(view,dialogStyle);
    },
    setDialogContent: function(model, view, template){
		var htmlStr=TrimPath.processDOMTemplate(template, model);
        $(view).innerHTML=htmlStr;
    },
	showEffect: function(model, view, template, baseElement, offset, options){
		PopDialog._show(model, view, template, baseElement, offset);
        Effect.SlideDown(view,{duration:0.2, userCallBack: function(){} });
	},
	hideEffect: function(view){
        Effect.SlideUp(view,{duration:0.2});
	},
	showOrHideEffect: function(model, view, template, baseElement, offset, options){
        if($(view).style.display=="none" || (baseElement!=PopDialog.baseElement)){
            PopDialog.showEffect(model, view, template, baseElement, offset);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideEffect(view);
        }
        PopDialog.baseElement=baseElement;
	},
	showLayer: function(model, view, template, baseElement, offset,options){
		PopDialog._show(model, view, template, baseElement, offset,options);
        PopDialog.pageLayer.addLayer({layerID: view, oneLayer:true});
	},
	hideLayer: function(view){
        Element.hide(view);
        PopDialog.pageLayer.removeLayer(view);
	},
	showOrHideLayer: function(model, view, template, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showLayer(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideLayer(view);
        }
        PopDialog.baseElement=baseElement;
	},
    showContentLayer: function(htmlContent, view, baseElement, offset, options){
		PopDialog.showDialog(htmlContent, view, baseElement, offset,options);
        PopDialog.pageLayer.addLayer({layerID: view, oneLayer:true});
    },
    showOrHideContentLayer: function(htmlContent, view, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showLayer(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideLayer(view);
        }
        PopDialog.baseElement=baseElement;
    },
    showContentEffect: function(htmlContent, view, baseElement, offset, options){
		PopDialog.showDialog(htmlContent, view, baseElement, offset,options);
        Effect.SlideDown(view,{duration:0.2, userCallBack: function(){} });
    },
    showOrHideContentEffect: function(htmlContent, view, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showEffect(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideEffect(view);
        }
        PopDialog.baseElement=baseElement;
    }
}
function $FR(element,time){
  var value=null;
  for (var i=0;i<time; i++){
     var elementValue=$F(element+i);
     if  (elementValue!=null && elementValue!="undefined") {
       value=elementValue;
       if (value=="true") value=true;
       if (value=="false") value=false;
       break;
     }
  };
  return value;
}


function $FC(element,time){
  var values=[];
  for (var i=0; i<time; i++){
     var elementValue=$F(element+i);
     if  (elementValue!=null && elementValue!="undefined") {
          //Logger.debug(" element: "+elementValue);
          values.push(elementValue);
    }
  }
  return values;
}

/*function showHideContent (contentId, arrowId, style){
    var arrowImg=$(arrowId);
    Logger.debug("contentId: "+contentId);
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+"/ico_up.gif";
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+"/ico_down.gif";
    }
}*/
function showHideContent (contentId, arrowId, style,upImg,downImg){
    var arrowImg=$(arrowId);
    var realUpImg,realDownImg;
    realUpImg=(null==upImg)?"/ico_up.gif":upImg;
    realDownImg=(null==downImg)?"/ico_down.gif":downImg;
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+realUpImg;
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+realDownImg;
    }
}
/*
function showHideContent (contentId, arrowId, style,upImg,downImg){
    var arrowImg=$(arrowId);
    Logger.debug("contentId: "+contentId);
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+upImg;
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+downImg;
    }
}
*/

var CommonSearchPanel={
    onClickTextInput: function(ele,value){	
        if($(ele).value == value){
            $(ele).value='';
            $(ele).style.color='#41586c';		
        }
    },

    onBlurTextInput: function(ele, value){
        $(ele).value=value;
        $(ele).style.color='#adadad';	
    }
}

//根据id得到名字, 传进去的数组元素为: {id:x, name:x}
var IdToName={
	convert: function(id, nameArray){
        var data=nameArray.find( function(curData){
            return curData.id==id;
        });
        if (null==data){
            return "";
        }
        return data.name;
	}
}

var DateFormat={
	format: function(date){
		return NetEase.DateTime.formatDate(date.getTime(),"yyyy-MM-dd");
	},
    formatTime: function(time){
		return NetEase.DateTime.formatDate(time,"yyyy-MM-dd");
    }
}



function trimStr(str, length){
	if (str==null){
		return "null string";
	}
	var needTrim=(str.length>length);
	if (needTrim){
		return str.substr(0,length)+"...";	
	}
	else{
		return str;
	}
}

//按中文长度算: 一个中文字符相当于两英文字符
function trimChStr(str, length){
	if (str==null){
		return "null string";
	}
    var i = 0;
    var j=0;
    var trimStr="";
    for (i = 0; i< str.length; i++) {     
	     if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
	        j=j+2;  
	     }
	     else {
	        j=j+1
	     }   
	     //Logger.debug("str: "+str+" length: "+length+" j: "+j+" i: "+i);
	     if (length<j){
	     	break;
	     }
    }  //结束FOR循环
    var counter=i;
    //Logger.debug("trim counter is "+counter);
    var needTrim=(str.length>counter);
	if (needTrim){
		return str.substr(0,counter)+"...";	
	}
	else{
		return str;
	}    
}
//获得一个字符串的长度，中文字算2个,英文字母算1个
function getStrLength(str){
	if (str==null){
		return 0;
	}
    var i = 0;
    var j=0;
	 for (i = 0; i< str.length; i++) {     
	     if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
	        j=j+2;  
	     }
	     else {
	        j=j+1
	     }   
	 } 
	 return j;
}
function changeButtonDisable(e,flag){
	cls=e.className;
	if(flag==true){
		cls=cls.replace(/ enableButton/gi,"");
		cls=cls.replace(/ disableButton/gi,"");
		cls+=" disableButton";
		e.className=cls;
	}
	else{
		cls=cls.replace(/ disableButton/gi,"");
		cls=cls.replace(/ enableButton/gi,"");
		cls+=" enableButton";
		e.className=cls;
	}
}

function addSelect(obj){
	if(null==obj)
		return;
	else
		obj.className+=" selectItem";
}

function removeSelect(obj){
	if(null==obj)
		return;
	else
		obj.className=obj.className.replace(/selectItem/gi,'');
}

function addUnderline(obj){
	if(null==obj)
		return;
	else
		obj.style.textDecoration="underline";
}

function removeUnderline(obj){
	if(null==obj)
		return;
	else
		obj.style.textDecoration='none';
}
/**
 * Convenience method for stopPropagation + preventDefault
 * @param {Event} ev the event
 */
function fStopEvent(ev) {
	if(!ev) ev = this.getEvent();
	this.fStopPropagation(ev);
	this.fPreventDefault(ev);
}
/**
 * Returns the event, should not be necessary for user to call
 * @param {Event} the event parameter from the handler
 * @return {Event} the event 
 */
function fGetEvent (e) {
	var ev = e || window.event;
	if (!ev) {
		var c = this.getEvent.caller;
		while (c) {
			ev = c.arguments[0];
			if (ev && Event == ev.constructor) {
			break;
			}
		c = c.caller;
		}
	}
	return ev;
}
/**
 * Stops event propagation
 * @param {Event} ev the event
 */
function fStopPropagation(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.stopPropagation) {
		ev.stopPropagation();
	} else {
		ev.cancelBubble = true;
	}
}

/**
 * Prevents the default behavior of the event
 * @param {Event} ev the event
 */
function fPreventDefault(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.preventDefault) {
		ev.preventDefault();
	} else {
		ev.returnValue = false;
	}
}
//将形如2006-10-11　转成为 Date 类型,并返回
function dateConverter(dateStr){
	    var times=dateStr.split("-");
        var curDate=new Date(times[0], times[1]-1, times[2]);
        return curDate;
}
function formatCircleImageUrl(url){
	if(url !=null && url != "-5000")
		return url;
	return "/style/common/group_default140.gif";
}

/**
 * 日志模块左侧类别列表
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>添加分类</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="删除" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="编辑" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
    {/if}\
');
/**
 * 日志模块左侧归档列表
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}年</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}年</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');

/**
 * 日志模块左侧评论列表, （编辑状态）
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有评论\
    {/if}\
');    

/**
 * 日志编辑下面的评论模板
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">发布者:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="删除评论">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="删除引用">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM月dd日 HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * 日志预览模块左侧类别列表
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;目前没有分类\
  	{/if}\
');

/**
 * 日志预览模块左侧存档列表
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}年</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}月(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}月(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;目前没有存档\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">发布者:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="删除评论">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM月dd日 HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="删除引用">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM月dd日 HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * 预览日志列表
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="折叠/展开日志正文">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>分类:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>标签:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">字号&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">大</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">中</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">小</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}"></div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}次阅读</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">固定链接<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">分享</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">引用 (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">评论 (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">　${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0表示关闭，1表示打开-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0表示关闭，1表示打开，2表示数据未生成-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="关闭">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">本文的固定不变链接:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">复制引用链接成功</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="复制引用链接">复　制</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 该分类暂无日志！\
	     {elseif loadType == "archive"}\
	      	 该归档暂无日志！\
	     {else}\
			 暂无日志！\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">标题</td><td class="g_w_15 g_t_left c09">类别</td><td class="g_w_15 c09 g_t_center">发布时间</td><td class="g_w_10 c09 g_t_center">删除</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY年 MM月dd日 HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>草稿</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>未发布，有待系统审核中</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>审核不通过</b>\
      			{elseif (b.valid == 26)}<br/><b>已被屏蔽，仅供本人阅读</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="删除blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>评论:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>引用:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		没有该分类的日志！\
	      {elseif loadType == "archive"}\
      			没有该归档的网络日志！\
	      {else}\
	      		暂无日志，可点击"添加日志"以添加日志内容。\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * 预览页面引用通告
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">本文引用地址:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">复制引用链接成功</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="复制引用链接" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >复　制</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="引用这篇日志" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>引　用</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">引用记录:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">引用人:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">相关圈子推荐</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
/**************************************************************
*		163 blog preview page left navigation column    	  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright：1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/


/** 
 * @fileoverview 
 * 日志浏览页面的左侧导航栏
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */

if (NEBlog==undefined){
	var NEBlog={};
}

/**
 * NEBlog.PrevBlogLeft Class
 *
 * @class 日志编辑页面的左侧导航栏对象
 */
NEBlog.PrevBlogLeft = Class.create();




/**
 * 全局变量, TrimPath模版parse后的对象
 * 用于显示"分类"栏目
 * @type	Object
 */
NEBlog.PrevBlogLeft.classesTemplate = null;
/**
 * 全局变量, TrimPath模版parse后的对象
 * 用于显示"存档"栏目
 * @type	Object
 */
NEBlog.PrevBlogLeft.archivesTemplate = null;
/**
 * 静态常量
 * 显示的"最新评论"的条数
 * @typpe 	Number
 */
NEBlog.PrevBlogLeft.RECENT_NUMBER = 5;

/**
 * @class	NEBlog.PrevBlogLeft.YearArchive
 * 			"存档"的年对象
 * @constructor	
 * @param	{Number}	iYear	年
 * @return	{Void}
 */
NEBlog.PrevBlogLeft.YearArchive =  function(iYear) {
	this.year = iYear;
	this.archives = [];	
}
/**
 * @class	NEBlog.PrevBlogLeft.MonthArchive
 * 			"存档"的月对象
 * @constructor	
 * @param	{Number}	iYear	年
 * @param	{Number}	iMonth	月
 * @param	{Number}	iCount	存档总数
 * @return	{Void}
 */
NEBlog.PrevBlogLeft.MonthArchive = function(iYear, iMonth, iCount) {
	this.year = iYear;
	this.month = iMonth;
	this.count = iCount;
	this.toStandardStr = function() {
		return this.year + '-' + this.month + '-' + '01';
	}
	this.toString = function() { 
		return this.year + '年' + this.month + '月';
	}
}



NEBlog.PrevBlogLeft.prototype = {
	/**
	 * EditBlogLeft类构造函数 初始化EditBlogLeft对象并预设参数
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeft实例对象名字	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft对象
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sParentName, sPageName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// 测试开关on或者off	
			sStyle  			:	null,		// 日志的样式地址前缀
			sHostName			:   '',			// 博主网易通行证名称
			iHostId				:   null,		// 博主的id
			sHostPath			:	null, 		// hostPath地址
			sServerName			: 	'',			// server名称
			sListType			: 	'',			// blog显示方式, 分类/存档/none...
			iVisitorRank		:   -100,		// 访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
			sYearPara			:   '',			// Archive显示模式下年的css参数显示参数
			sMonthPara			:   ''			// Archive显示模式下月的css参数显示参数
		}, arguments[3]||{});
		/**
		 * 对象实例名称
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * 调用改对象的父类对象名称
		 * @private
		 * @type	String
		 */
		this._sParentName = sParentName
		/**
		 * 右侧页面名称, 分2种: editBlogAll和editBlog
		 * @private
		 * @type	String
		 */
		this._sPageName = sPageName; 
		/**
		 * 因为blinddown有延时,需要控制其同步状态
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * 测试类对象
		 * @private
		 * @type	Objects
		 */
		this._oTester4EBL = null;
		/**
		 * 是否生成过"归档"模块的数据
		 * @private
		 * @type	Boolean
		 */
		this._bHasArchive = false;
		/**
		 * 是否生成过"最新评论"模块的数据
		 * @private
		 * @type	Boolean
		 */
		this._bHasRecentComments = false;
		/**
		 * 最新评论数组, 被prevBlog.js使用
		 * @type	Array
		 */
		this.recentComments;
		
		this._init();
		
		return this;
	},
	
	/**
	 * 初始化函数
	 * @private
	 * @return	{Void}
	 */
	_init: function() {
		if(NEBlog.PrevBlogLeft.classesTemplate == null)
			NEBlog.PrevBlogLeft.classesTemplate = createJSTAndParse("jst_blog_prev_class", jst_blog_prev_class);	
		if(NEBlog.PrevBlogLeft.archivesTemplate == null)
			NEBlog.PrevBlogLeft.archivesTemplate = createJSTAndParse("jst_blog_prev_arch", jst_blog_prev_arch);	
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBL = new NECtrl.SeleniumTester();
	},
	/**
	 * 显示日志"分类"模块
	 * @param	{Array}		oClasses			分类对象列表
	 * @param	{String}	sElemId				显示分类模块的div的id
	 * @param	{Number}	iTotalBlogCount		blog的总数量
	 * @param	{Number}	iVisitorRank		访问者的等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
	 * @param	{String}	sListType			日志显示类型, 按class显示,或者archive等
	 * @param	{Number}	iEncodeClassId		class显示时对应的样式的编号
	 * @return	{Void}		
	 * @see		#_test4EBL
	 * @see		#applySelectCss
	 * @see		Trimpath
	 */
	showBlogClasses: function (oClasses, sElemId, iTotalBlogCount, iVisitorRank, sListType, iEncodeClassId) {
		// 日志浏览页面需要针对博主的访问权限,来设置分类日志的数量
		var _oBlogCount = new Array(); 
		for (var i = 0; i < oClasses.length; i++) {
			if (iVisitorRank >= 10000)
				_oBlogCount[i] = oClasses[i].publishedBlogCount;
			else if (iVisitorRank >= 100)
				_oBlogCount[i] = oClasses[i].publicBlogCount + oClasses[i].friendBlogCount;
			else if (iVisitorRank >= -100)
				_oBlogCount[i] = oClasses[i].publicBlogCount;
		}
		var _oData = {classes: oClasses, totalBlogCount: iTotalBlogCount, classBlogCount: _oBlogCount, 
					  hostName: this._oOptions.sHostName, pageName: this._sPageName, 
					  hostPath: this._oOptions.sHostPath, parentName: this._sParentName};
		var _sResult = NEBlog.PrevBlogLeft.classesTemplate.process(_oData);
		$(sElemId).innerHTML = _sResult;	
		if (sListType == 'class') {
			applySelectCss("blogClassId"+iEncodeClassId);
		} else if (sListType == 'archive') {
			//do nothing
		} else {
				applySelectCss("blogAll");		
		}
		
		if (this._oTester4EBL) {
			if (oClasses == null || oClasses.length == 0) {
				this._test4PBL("LClass", "null");
			} else {
				var _aClsId = oClasses.pluck("id");
				this._test4PBL("LClass", _aClsId);
			}
		}	
	},
	/**
	 * 显示"存档"模块
	 * @param	{Array}		oArchives		"存档"对象列表
	 * @param	{String}	sElemId			显示区域的div对应的id
	 * @param	{Number}	iVisitorRank	访问者的等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
	 * @param	{String}	sListType		日志显示类型, 按class显示,或者archive等
	 * @private	{String}	sYearPara		年的css参数显示参数
	 * @private	{String}	sMonthPara		月的css参数显示参数
	 * @return	{Void}
	 * @see		NEBlog.PrevBlogLeft.MonthArchive
	 * @see		NEBlog.PrevBlogLeft.YearArchive
	 * @see		#_test4EBL
	 * @see		Trimpath
	 */
	showArchives: function(oArchives, sElemId, iVisitorRank, sListType,sYearPara,sMonthPara) {
		var _oYearArchs = [];
		var _iYearIndex = -1;	
		var _iArchiveCount = oArchives.length;
		for (var i = 0; i < _iArchiveCount; i++) {
			var _oDate = new Date(oArchives[i].archiveDate);
			var _iYear = _oDate.getFullYear();
			var _iMonth  = parseInt(_oDate.getMonth()) + 1;
			var _iCount = 0;
			if (iVisitorRank >= 10000) {
				_iCount = oArchives[i].publishedBlogCount;
			}
			else if (iVisitorRank >= 100)
				_iCount = oArchives[i].publicBlogCount + oArchives[i].friendBlogCount;
			else if (iVisitorRank >= -100)
				_iCount = oArchives[i].publicBlogCount;
			if (_iCount == 0)
				continue;
			if (_iYearIndex >= 0 && _oYearArchs[_iYearIndex].year == _iYear) { //已经生成了年对象
				//创建一个月对象
				var _oMonthArch = new NEBlog.PrevBlogLeft.MonthArchive(_iYear, _iMonth, _iCount);
				_oYearArchs[_iYearIndex].archives.push(_oMonthArch);
			} else {
				//创建一个年对象
				var _oYearArch = new NEBlog.PrevBlogLeft.YearArchive(_iYear);  
				//创建一个月对象
				var _oMonthArch = new NEBlog.PrevBlogLeft.MonthArchive(_iYear, _iMonth, _iCount); 
				_oYearArch.archives.push(_oMonthArch);
				//把年对象存入年数组中
				_oYearArchs.push(_oYearArch);
				_iYearIndex++;
			}
		}
		var _oData = {yearArchs: _oYearArchs, pageName: this._sPageName, hostPath: this._oOptions.sHostPath, 
					  objName: this._sObjectName, style: this._oOptions.sStyle, parentName:this._sParentName};

		var _sRresult = NEBlog.PrevBlogLeft.archivesTemplate.process(_oData); 
		$(sElemId).innerHTML = _sRresult;
		if (sListType == 'class') {
		} else if (sListType == 'archive') {
			applySelectCss("monthArch"+sYearPara+"_"+sMonthPara);		
			this.show_hide("yearArch"+sYearPara, "updown"+sYearPara, "icn_up.gif", "icn_down.gif");
		} else {
			applySelectCss("blogAll");		
		}
		
		if (this._oTester4EBL) {
			if (oArchives == null || oArchives.length == 0) {
				this._test4PBL("LArch", "null");
			} else {
				var _aArchId = oArchives.pluck("id");
				this._test4PBL("LArch", _aArchId);
			}
		}	
	},
	
	/**
	 * 打开关闭左侧栏部分栏目
	 * @param	{String}	sShowId		正文对应的div的id
	 * @param	{String}	sArrowId	打开关闭正文的箭头id
	 * @param	{String}	sUpImg		打开的箭头图片
	 * @param	{String}	sDownImg	关闭的箭头图片
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 * @see		Effect#Up
	 * @see		#showArchives
	 * @see		#showRecentComments
	 */
	show_hide: function(sShowId, sArrowId, vIsyear){
		if (this._bShowHiding == true)
			return;
		var _oShowDiv = $(sShowId);		
		if(_oShowDiv.style.display=="none") {
			/*后加载存档*/
			if(sShowId == "_$_blog_prev_arch" && !this._bHasArchive) {
				this._bHasArchive = true;
					//获取归档
				BlogBean.getRecentArchives(this._oOptions.iHostId, {
					callback:function(oDataFromServer) {
						this.showArchives(oDataFromServer, "_$_blog_prev_arch" , this._oOptions.iVisitorRank, 
										  this._oOptions.sListType, this._oOptions.sYearPara, this._oOptions.sMonthPara);
					}.bind(this)
				});	
			}
			if (sArrowId != null)
				if(true==vIsyear) {
					Element.removeClassName(sArrowId,"n0");
	  				Element.addClassName(sArrowId,"n1");
				}else{
					Element.removeClassName(sArrowId,"n2");
	  				Element.addClassName(sArrowId,"n3");
				}
			this._bShowHiding = true;
			Effect.BlindDown(sShowId,{duration:0.1, 
				userCallBack: function(){
					this._bShowHiding = false;
				}.bind(this)
			});
		}else {
	  		if (sArrowId != null)
	  			if(true==vIsyear){
	  				Element.removeClassName(sArrowId,"n1");
	  				Element.addClassName(sArrowId,"n0");
	  			}else{
	  				Element.removeClassName(sArrowId,"n3");
	  				Element.addClassName(sArrowId,"n2");
	  			}
			this._bShowHiding = true;
	  		Effect.BlindUp(sShowId,{duration:0.1, 
	  			userCallBack: function(){
	  				this._bShowHiding = false;
	  			}.bind(this)
	  		});
	  	}
	},
	/**
	 * 测试
	 * @private
	 * @param	{String}	sKey		测试对象的键
	 * @param	{String}	vValues		测试对象的值
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PBL: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBL)
			return;
		switch (sKey) {
			case "LClass":
				this._oTester4EBL.setArray("LClass", vValues);
				break;
			case "LArch":
				this._oTester4EBL.setArray("LArch", vValues);
				break;
			case "LRcntCom":
				this._oTester4EBL.setArray("LRcntCom", vValues);
				break;
		}	
	}
}

var recentNumber = 5;
var serverName;
var gRecentComments;
var gStatusElemId;
function clickTBUrl(urlElemId, statusElemId) {
	if(copyText(urlElemId)){
		document.getElementById(statusElemId).style.display='inline';
		gStatusElemId = statusElemId;
		window.setTimeout(fadeStatus, 5000);
	}
}

function fadeStatus() {
	document.getElementById(gStatusElemId).style.display='none';
}

/*************************************************字号*************************************************/
function changeFont(sElemId, size) {
	if (size == 1) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		Element.addClassName(sElemId, "g_t_large");
	}else if (size == 2) {
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
		Element.addClassName(sElemId, "g_t_midle");
	}else if (size == 3) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
	}
}
/**************************************************************
*				163 blog preview page 						  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright：1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * 日志预览(浏览)页面
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @requires  prevBlogComm.js
 * @see		  
 */
 
if (NEBlog==undefined){
	var NEBlog={};
}


/**
 * 全局变量, PrevBlog对象实例, 用于ftl页面访问
 * @type	NEBlog.PrevBlog
 */
NEBlog.gPrevBlog = null;


function gLoadPrevBlog(sPageName, sStyle, sHostName, iHostId,
		sHostPath,sServerName,sListType	,iBlogRange ,iCommentRange, iTotalBlogCount, sCircleBaseUrl,
		iVisitorId,sVisitorName, sVisitorNickname,sVisitorAvatar, iVisitorRank, sVisitorIP,	
		iGlobalAllowComment, iVisibleBlogCount, sParamClsId	,sEncodeClassId, sParamClsName, 
		sParamArchDate, sClsElemId, sTestOn)
{
	NEBlog.gPrevBlog = new NEBlog.PrevBlog('NEBlog.gPrevBlog', sPageName, {
		sTestOn:sTestOn, sStyle:sStyle, sHostName:sHostName, iHostId:iHostId,
		sHostPath:sHostPath, sServerName:sServerName, sListType:sListType,
		iBlogRange:iBlogRange,iCommentRange:iCommentRange, iTotalBlogCount:iTotalBlogCount, 
		sCircleBaseUrl:sCircleBaseUrl, iVisitorId:iVisitorId, sVisitorName:sVisitorName, 
		sVisitorNickname:sVisitorNickname, sVisitorAvatar:sVisitorAvatar, iVisitorRank:iVisitorRank, 
		sVisitorIP:sVisitorIP, iGlobalAllowComment:iGlobalAllowComment, 
		iVisibleBlogCount:iVisibleBlogCount, sParamClsId:sParamClsId, sEncodeClassId:sEncodeClassId, 
		sParamClsName:sParamClsName, sParamArchDate:sParamArchDate,
		sClsElemId:sClsElemId});

}




/**
 * NEBlog.PrevBlog Class
 *
 * @class 日志预览(浏览)页面对象
 */
NEBlog.PrevBlog = Class.create();



/**
 * 全局变量, TrimPath模版parse后的对象
 * 用于显示日志
 * @type	Object
 */
NEBlog.PrevBlog.blogsTemplate = null;
/**
 * 全局变量, TrimPath模版parse后的对象
 * 用于显示日志的引用通告
 * @type	Object
 */
NEBlog.PrevBlog.trackbacksTemplate = null;
/**
 * 全局变量, TrimPath模版parse后的对象
 * 用于显示推荐博客和圈子
 * @type	Object
 */
NEBlog.PrevBlog.relateBlogCircleTemplate = null;
/**
 * 静态变量, 评论的最大字数
 * @type	Number
 */
NEBlog.PrevBlog.COMMENT_MAX_LENTH = 1000;



NEBlog.PrevBlog.prototype = {
	/**
	 * PrevBlog类构造函数 初始化PrevBlog对象并预设参数
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeft实例对象名字	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft对象
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sPageName){
		/**
		 * 初始化参数选项
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// 测试开关on或者off	
			sStyle  			:	null,		// 日志的样式地址前缀
			sHostName			:   null,		// 博主网易通行证名称
			iHostId				:   null,		// 博主的id
			sHostPath			:	null, 		// hostPath地址
			sServerName			: 	null,		// server名称
			sListType			: 	null,		// blog显示方式, class/archive/none
						                 
			iBlogRange   		:   10,			// 每页显示的日志数量           
			iCommentRange		:	10,         // 每篇日志显示的评论数         
			iTotalBlogCount		:	0,			// 总的日志数量                                              
			sCircleBaseUrl		:	'',         // 圈子首页url地址   
            
            iVisitorId			:	null,		// 访问者id   
			sVisitorName		:	null,     	// 访问者的用户名                         
			sVisitorNickname	:	null,       // 访问者的昵称   
			sVisitorAvatar		:	null,       // 头像链接地址     
            iVisitorRank		:   null,		// 访问者身份等级：-100:匿名，0:登陆用户，100:朋友，10000:主人
			sVisitorIP			:	null,       // 访问者           
			iGlobalAllowComment	:	null, 		// 是否该对象允许评论（用户设置的评论访问权限），
			
			iVisibleBlogCount	:	null,        
			sParamClsId			:	null,
			sEncodeClassId		:	null,
			sParamClsName		:	null, 
			sParamArchDate		: 	null,
			sClsElemId			:	null	
		}, arguments[2]||{});
		
		/**
		 * 对象实例名称
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * 右侧页面名称, 分2种: editBlogAll和editBlog
		 * @private
		 * @type	String
		 */
		this._sPageName = sPageName; 
		/**
		 * 因为blinddown有延时,需要控制其同步状态
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * 测试类对象
		 * @private
		 * @type	Objects
		 */
		this._oTester4PB = null;		
		/**
		 * 因为blinddown有延时,需要控制四个blinddown窗口的打开关闭同步问题
		 * blinddown显示的一定是最后点击的那个链接对应的窗口
		 * _iGid用于控制四个窗口的打开关闭同步问题
		 * @private
		 * @type	Number
		 */
		this._iGid ;
		/**
		 * 评论对象实例数组
		 * @type	Array
		 */
		this.commentPublishes = {};
		/**
		 * 日志当前页对象
		 * @private
		 * @type	Object
		 */
		this._oBlogPager = null;
		/**
		 * 左侧栏的Archive显示模式下年的css参数显示参数
		 * @private
		 * @type	String
		 */
		this._sYearPara = null;	
		/**
		 * Archive显示模式下月的css参数显示参数
		 * @private
		 * @type	String
		 */
		this._sMonthPara = null; 	
		/**
		 * 日志分类对象
		 * @private
		 * @type	Array
		 */
		this._oBlogClasses = null;
		/**
		 * 当前打开的日志id
		 * @private
		 * @type	Number
		 */
		this._iOpenBlogId = null;
		/**
		 * 相关推荐圈子, blogId-->div内容
		 * @private
		 * @type	Array
		 */
		this._oRelateBlogCircleMap = {};
		/**
		 * 左侧栏对象, 用于显示分类, 存档, 最新日志
		 * @type	Object
		 */
		this.prevBlogLeft = null;	
		/**
		 * 每篇日志的下部工具条的展开和关闭状态
		 * 以Map存放打开和关闭状态
		 * key: 日志的BlogId
		 * value: 该日志打开的工具条对应的Div的id
		 * @type 	Array
		 */
		this._oCssTabBarUpdownStatus = {};
		
		this._init();
		
		return this;
	},
	/**
	 * 初始化函数
	 * @private
	 * @return	{Void}
	 * @see		NECtrl.SeleniumTester
	 */
	 _init: function() {
	 	if (this._oOptions.sTestOn == 'on')
			this._oTester4PB = new NECtrl.SeleniumTester();
		if(NEBlog.PrevBlog.blogsTemplate == null)
			NEBlog.PrevBlog.blogsTemplate = createJSTAndParse("jst_blog_prev_list", jst_blog_prev_list);	
		if(NEBlog.PrevBlog.trackbacksTemplate == null)
			NEBlog.PrevBlog.trackbacksTemplate = createJSTAndParse("jst_blog_prev_track", jst_blog_prev_track);
		if(NEBlog.PrevBlog.relateBlogCircleTemplate == null)
			NEBlog.PrevBlog.relateBlogCircleTemplate = createJSTAndParse("relateBlogCircle_jst", jst_blog_prev_related_circle);	
		if (this._oOptions.sListType == 'class') {
			this.openBlogsByClass(this._oOptions.sParamClsId, this._oOptions.sParamClsName,this._oOptions.iVisibleBlogCount);
		} else if (this._oOptions.sListType == 'archive') {
			var _sParamArchDateStr = this._oOptions.sParamArchDate;
			if (this._oOptions.sParamArchDate == '')
				_sParamArchDateStr = "1900-01";		
			var _s = _sParamArchDateStr.split("-");	
			$("blogArchives").style.display="block";
			$("_$_blog_prev_class").style.display="none";
			this._sYearPara = _s[0];
			this._sMonthPara = _s[1];
			this.openBlogsByArchive(_sParamArchDateStr + '-01', s[0] + '年' + s[1] + '月', this._oOptions.iVisibleBlogCount);
		} else {
			this.openBlogsAll(this._oOptions.iVisibleBlogCount);
			
		}
		// 初始化左侧栏对象
		this.prevBlogLeft = new NEBlog.PrevBlogLeft(this._sObjectName+".prevBlogLeft", this._sObjectName, this._sPageName, 
					   {sStyle: this._oOptions.sStyle, 
						sHostName: this._oOptions.sHostName, 
						iVisitorRank:this._oOptions.iVisitorRank,
						iHostId: this._oOptions.iHostId, 
						sHostPath:this._oOptions.sHostPath,
						sServerName: this._oOptions.sServerName, 
						sListType: this._oOptions.sListType, 
						sYearPara: this._sYearPara, 
						sMonthPara:this._sMonthPara });
	
		// 获取获取分类	
		BlogBean.getBlogClasses(this._oOptions.iHostId, {
			callback:function(oDataFromServer) {
				this.prevBlogLeft.showBlogClasses(oDataFromServer, this._oOptions.sClsElemId, 
								this._oOptions.iTotalBlogCount, this._oOptions.iVisitorRank,
								this._oOptions.sListType,this._oOptions.sEncodeClassId);
			    this._oBlogClasses = oDataFromServer;
			}.bind(this)
		});	

			
	},
	/**
	 * 载入日志
	 * @private
	 * @param	{Object}	oParams		参数
	 * @param	{Object}	fnCallback	回调函数
	 * @return	{Void}
	 */
	_loadBlogs: function(oParams, fnCallback) {
		if (oParams.loadType == "class") {
			BlogBean.getBlogsByClassInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, oParams.classId, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//从服务端读到后先设置为未读取
					});
					fnCallback(oDataFromServer);
				}
			});
		} else if (oParams.loadType == "archive") {
			BlogBean.getBlogsByArchiveInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, oParams.archDate, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//从服务端读到后先设置为未读取
					});
					fnCallback(oDataFromServer);
				}
			});
		} else {
			BlogBean.getBlogsInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//从服务端读到后先设置为未读取
					});
					fnCallback(oDataFromServer);
				}
			});
		}	
	},
	/**
	 * 显示日志页面
	 * @private
	 * @param	{Array}		oParams		参数
	 * @param	{Object}	oParams		参数
	 * @return	{Void}
	 * @see		#incBlogAccessCount
	 * @see		#showRelateBlogCircle
	 * @see		#_test4PB
	 * 
	 */
	_showBlog: function(oBlogs, oParams) {
		var _oData = {blogs: oBlogs, visitorName: this._oOptions.sVisitorName, 
					  style: this._oOptions.sStyle,
					  hostName: this._oOptions.sHostName, loadType: oParams.loadType,
					  objName: this._sObjectName, blogRange:this._oOptions.iBlogRange};
		var _sResult = NEBlog.PrevBlog.blogsTemplate.process(_oData);
		$("_$_blog_prev_list").innerHTML = _sResult;
		/*if (oBlogs != null && oBlogs.length > 0) {
			this.incBlogAccessCount(oBlogs[0]);  //最近日志评论数目+1
			this._iOpenBlogId = oBlogs[0].id;
			this.showRelateBlogCircle(this._iOpenBlogId);
		}*/
		this._iOpenBlogId = null;
		
		if (this._oTester4PB != null) {
			if (oBlogs == null || oBlogs.length == 0) {
				this._test4PB("Blog", "null");
			} else {
				var _aBId = oBlogs.pluck("id");
				this._test4PB("Blog", _aBId);
			}
		}
	},
	/**
	 * 增加日志访问计数
	 * @param	{Object}	oBlog
	 * @return	{Void}
	 */
	incBlogAccessCount: function(oBlog) {
		if (oBlog.hasRead == 0) {
			BlogBean.incBlogAccessCount(oBlog.id, oBlog.userId, {
				callback: function(oDataFromServer) {
					if (oDataFromServer == true) {
						oBlog.hasRead = 1;
						oBlog.accessCount++;
					}
				}
			});
		}
	},
	/**
	 * 函数对象, 用于处理tag标签, 把tag串变成数组	
	 * @param	{Object}	oData
	 * @return	{Void}
	 */
	_fnBlogFilter: function(oData) {
		oData.each( function(e) { 
			//处理tag
			if (e.tag != null && e.tag != "") {
				e.tagArray = e.tag.split(",");
			} else {
				e.tagArray = null;
			}
		});	
	},
	/**
	 * 打开新的日志页, 新建分页类对象
	 * @private
	 * @param	{Number}	iBlogCount		需要显示的日志总数
	 * @param	{Object}	oLoadParam		载入日志函数的参数
	 * @param	{Object}	oPresentParam	显示日志函数的参数
	 * @return	{Void}
	 * @see		#NetEase.CachePage
	 * @see		NetEase.CachePage#nextPage
	 * @see		#_loadBlogs
	 * @see		#_showBlog
	 * @see		#_fnBlogFilter
	 * @see		#_updtBlogIt
	 */
	_newBlogPager: function(iBlogCount, oLoadParam, oPresentParam) {
		/*this._oBlogPager = new NetEase.CachePage({pageSize: this._oOptions.iBlogRange, prefetch: false, prefetchMulti: 0, markID: "blogPageNav:_$$_blog_prev_bottom_menu", styleDir: this._oOptions.sStyle, totalSize: iBlogCount,
			loadFunc: this._loadBlogs.bind(this), loadParam:oLoadParam, presentFunc: this._showBlog.bind(this), userPresentFuncParam: oPresentParam, filterFunc: this._fnBlogFilter,
			updateIterator: this._updtBlogIt, needRefreshAfterUpdate: false, beforeID: "blogPageNav2", 
			beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop});	*/
		this._oBlogPager = new NetEase.PageNumber({pageSize: this._oOptions.iBlogRange, markID: "blogPageNav:_$$_blog_prev_bottom_menu", styleDir: this._oOptions.sStyle, totalSize: iBlogCount,
			loadFunc: this._loadBlogs.bind(this), loadParam:oLoadParam, presentFunc: this._showBlog.bind(this), userPresentFuncParam: oPresentParam, filterFunc: this._fnBlogFilter,
			updateIterator: this._updtBlogIt, needRefreshAfterUpdate: false, beforeID: "_$$_blog_prev_bottom_menu", 
			beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop, beforeChange:this._scrollToBlogTop});	
		this._oBlogPager.show();
	},
	/**
	 * 日志迭代器, 作为参数传入newBlogPager函数
	 * @param	{Object}	oFirst	第一个参数
	 * @param	{Object}	oSecond	第二个参数
	 * @return	{Boolean}	参数是否相等
	 */
	_updtBlogIt: function(oFirst, oSecond) {
		return (oFirst.id == oSecond.id);
	},
	/**
	 * 滚动对齐到日志区域顶部
	 * 
	 */
	_scrollToBlogTop: function() {
		new Effect.ScrollTo("_$$_blog_prev_top_menu", {duration:0.0});//自动对齐
	},
	/**
	 * 打开所有日志, 点击左侧栏"所有日志"触发
	 * @param	{Number}	显示的日志总数量
	 * @return	{Void}
	 * @see		#_newBlogPager
	 */
	openBlogsAll: function(iBlogCount) {
		var _oLoadParam = {loadType:"all"};
		var _oPresentParam = {loadType:"all"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "所有日志";
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * 根据类别显示日志, 点击左侧栏某个日志类别触发
	 * @param	{Number}	iClassId	类别id
	 * @param	{String}	sClassName	分类名称
	 * @return	{Void}
	 * @see		#_showBlog
	 * @see		NetEase.CachePage#reset
	 * @see		#_newBlogPager
	 */
	openBlogsByClass: function(iClassId, sClassName, iBlogCount) {
		if (iBlogCount == 0) {
			this._showBlog(null, {loadType:"class"});
			var _sLoadType = "(分类：" + sClassName + ")";
			$("blogType").innerHTML = _sLoadType;
			if(this._oBlogPager==null)
			{
				var _oLoadParam = {loadType:"class", classId: iClassId};
				var _oPresentParam = {loadType:"class"};
				this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
			}
			this._oBlogPager.reset();
			return;
		}
		var _oLoadParam = {loadType:"class", classId: iClassId};
		var _oPresentParam = {loadType:"class"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "分类：" + sClassName ;
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * 根据存档显示日志, 点击左侧栏"存档"触发
	 * @param	{String}	sArchDate		标准日期格式	2007-01-01
	 * @param	{String}	sArchDateStr	日期字符串	2007年1月
	 * @return	{Void}
	 */
	openBlogsByArchive: function(archDate, archDateStr, iBlogCount) {
		var _oLoadParam = {loadType:"archive", archDate: archDate};
		var _oPresentParam = {loadType:"archive"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "归档：" + archDateStr ;
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * 打开日志分类相同的日志
	 * @param	{Number}	iClassId	类别id
	 * @param	{String}	sClassName	分类名称
	 * @return	{Void}
	 * @see		#openBlogsByClass
	 */
	openSameClass: function(iClassId, sClassName) {
		var _iBlogCount = 0;
		for (var i = 0; i < this._oBlogClasses.length; i++) {
			if (this._oBlogClasses[i].id == iClassId) {
				_iBlogCount = this._oBlogClasses[i].publishedBlogCount;
			}
		}
		this.openBlogsByClass(iClassId, sClassName, _iBlogCount);
	},
	/**
	 * 显示或隐藏每一篇日志
	 * @param	{String}	sBlogId			日志id
	 * @param	{String}	sShowIdPrefix	日志显示区域的id前缀
	 * @param	{String}	sArrowIdPrefix	折叠箭头图片的id前缀
	 * @return	{Void}		
	 * @see		NetEase.CachePage#getAllCachedData
	 * @see		#incBlogAccessCount
	 * @see		#showRelateBlogCircle
	 * @see		Effect#BlindDown
	 * @see		Effect#BlindUp
	 * @see		Effect#ScrollTo
	 */
	show_hide_each_blog: function(sBlogId, sShowIdPrefix, sArrowIdPrefix){
		if (this._bShowHiding == true)
			return;	
		var _sShowId = sShowIdPrefix + sBlogId;
		var _sArrowId = sArrowIdPrefix + sBlogId;
		var _oShowDiv = $(_sShowId);		
		if(_oShowDiv.style.display=="none") {
			this._bShowHiding = true;
			if (_sArrowId != null) {
				Element.removeClassName(_sArrowId,"n2");
	  			Element.addClassName(_sArrowId,"n3");
			}	
			// 根据blogId遍历查找当前页面中需要展开的blog的的对象赋给_oBlog
			var _oCachedBlogs = this._oBlogPager.getAllCachedData();
			
			
			var _oBlog = null;
			if (_oCachedBlogs != null) {
				_oBlog = _oCachedBlogs.detect(
					function(e){
						if(e.id == sBlogId)
							return true;
						return false;
					}
				);
			}
			//展开日志的内容文字部分填入
			var _oBlogtext = $("blogtext_" + sBlogId);
			if (_oBlogtext != null && _oBlog != null && _oBlog.content != null) {
				_oBlogtext.innerHTML = _oBlog.content;
			}
			//关闭之前展开的日志	
			Effect.BlindDown(_sShowId,{duration:0.1, 
				userCallBack: function(){
					
					if (this._iOpenBlogId != null) {
						var _sOldShowId = sShowIdPrefix + this._iOpenBlogId;
						var _sOldArrowId = sArrowIdPrefix + this._iOpenBlogId;
						if (_sOldArrowId != null)	{
							Element.removeClassName(_sOldArrowId,"n3");
	  						Element.addClassName(_sOldArrowId,"n2");
						}
						$(_sOldShowId).style.display = "none";			
						var _sOldBlogtext = $("blogtext_" + this._iOpenBlogId);
						if (_sOldBlogtext != null) {
							_sOldBlogtext.innerHTML = "";
						}	  		
						this._iOpenBlogId = null;
					}
					this._iOpenBlogId = sBlogId;
					//new Effect.ScrollTo("blog_" + sBlogId, {duration:0.0});//自动对齐到标题
					this._bShowHiding = false;
				}.bind(this)
			});
				 	
			if (_oBlog == null)
				return;
			// 增加访问计数
			this.incBlogAccessCount(_oBlog);
			this.showRelateBlogCircle(sBlogId);
			
		}else { // 收起日志的显示
	  		this._bShowHiding = true;
	  		if (_sArrowId != null){
	  			Element.removeClassName(_sArrowId,"n3");
	  			Element.addClassName(_sArrowId,"n2");
	  		}		
			var _oBlogtext = $("blogtext_" + sBlogId);
	  		Effect.BlindUp(_sShowId,{duration:0.1, 
	  			userCallBack: function(){ 
					if (_oBlogtext != null) {
						_oBlogtext.innerHTML = "";
					}
					this._iOpenBlogId = null;
					this._bShowHiding = false;				
	  			}.bind(this)
	  		});
	  	}	
	},
	/**
	 * 相关日志推荐，相关圈子推荐
	 * @param	{String}	sBlogId			日志id
	 * @return	{Void}		
	 */
	showRelateBlogCircle: function(sBlogId){
		if(sBlogId == null) // 当前未打开日志
			return;
		/*	for test
					var _oList = [
						[{blogTitle:"titdddddddddddddddddddddddddddddddddle1",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}},
						{blogTitle:"标题2dddddddddddddddddddddddddddddddd3424242424244242424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"呃呃呃dddddddddddddddddddddddddddddddddd呃",circle:{name:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"}},
						{blogTitle:"dddddddddddddddddddddddddddd",circle:{name:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"}}],
						[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"灯下漫笔"}},{blogTitle:"我爱你中国",circle:{name:"灯下漫笔"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"灯下漫笔"}},{blogTitle:"我爱你中国",circle:{name:"灯下漫笔"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"灯下漫笔"}},{blogTitle:"我爱你中国",circle:{name:"灯下漫笔"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"灯下漫笔"}},{blogTitle:"我爱你中国",circle:{name:"灯下漫笔"}}]
					];
		var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};		
		var _sResult = NEBlog.PrevBlog.relateBlogCircleTemplate.process(_oData);

		$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
		*/
		if(this._oRelateBlogCircleMap[sBlogId] == null){ // 未生成数据，则向服务器请求生成
			BlogBean.getRelateBlogsCircles(sBlogId, this._oOptions.iHostId, {
				callback: function(oDataFromServer) {
					var _oList = oDataFromServer;
					var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};
					
					var _sResult = NEBlog.PrevBlog.relateBlogCircleTemplate.process(_oData);
					if(_sResult == ""){
						$("relateBlogCircle_"+sBlogId).style.display = "none";
					}else{
						$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
					}
					this._oRelateBlogCircleMap[sBlogId] = _sResult;
				}.bind(this)
			});
		}else{//已生成
				var _sResult = this._oRelateBlogCircleMap[sBlogId];
				if(_sResult == ""){
					$("relateBlogCircle_"+sBlogId).style.display = "none";
				}else{
					$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
				}
		}
	},
	/**
	 * 打开某篇日志的评论
	 * @param	{String}	sBlogId			日志id
	 * @param	{Number}	iCommentCount	此篇日志的评论总数
	 * @param	{String}	sBlogTitle		日志标题
	 * @param	{String}	sBlogPermalink	日志的固定链接地址
	 * @return	{Void}	
	 */
	openComments: function(sBlogId, iCommentCount, sBlogTitle, sBlogPermalink) {	
			
		if ($('openCom_' + sBlogId).value == 2) {//数据尚未生成
			BlogBean.getComments(sBlogId, this._oOptions.iCommentRange, 0, {
				callback:function(oDataFromServer) {
					$('openCom_' + sBlogId).value = 0;//表示数据已经生成
			    	this._showComments(oDataFromServer, sBlogId, iCommentCount, sBlogTitle, sBlogPermalink, 
			    				"comShow_" + sBlogId, "comPub_" + sBlogId);			
			  }.bind(this)
			});		
			
		}else {
			this._upDownComments(sBlogId, null);		
		}		 
	},
	/**
	 * 创建评论对象, 并显示
	 * @private
	 * @param	{Array}		oComments		评论对象数组
	 * @param	{String}	sBlogId			日志id
	 * @param	{Number}	iCommentCount	此篇日志的评论总数
	 * @param	{String}	sBlogTitle		日志标题
	 * @param	{String}	sBlogPermalink	日志的固定链接地址
	 * @param	{String}	sComShowElemId	评论显示区div的id
	 * @param	{String}	sComPubElemId	评论发布区div的id
	 * @return	{Void}	
	 * 
	 * @see		NetEase.CommentPublish
	 * @see		#_test4PB
	 */
	_showComments: function(oComments, sBlogId, iCommentCount, sBlogTitle, sBlogPermalink, sComShowElemId, sComPubElemId) {	
		
		this.commentPublishes[sBlogId] = new NetEase.CommentPublish(oComments, sBlogId, iCommentCount, sComShowElemId, sComPubElemId, 
								{ sStyle: this._oOptions.sStyle, bCanClose: true, 
								  bHasCancelBtn: true, bNeedCheckLogin: false, bNeedCheckRight: true, 
								  iAllowComment: this._oOptions.iGlobalAllowComment, iPageSize: this._oOptions.iCommentRange,
								  iHostId: this._oOptions.iHostId, sHostName: this._oOptions.sHostName, 
								  iVisitorId: this._oOptions.iVisitorId, sVisitorName: this._oOptions.sVisitorName, 
								  sVisitorNickname:  this._oOptions.sVisitorNickname, sVisitorAvatar: this._oOptions.sVisitorAvatar, 
								  iVisitorRank: this._oOptions.iVisitorRank, sVisitorIP: this._oOptions.sVisitorIP, 
								  iEditorMaxLen: NEBlog.PrevBlog.COMMENT_MAX_LENTH, sLoginRedirect: '/'+this._oOptions.sHostName+'/blog/',
								  iInputWidth: 720, iEditorHeight: 230, fnOpenCommentEffect: this._upDownComments.bind(this), 
								  fnAddComment: this._addNewComment.bind(this), oAddCommentParams: {blogUserId: this._oOptions.iHostId, blogTitle: sBlogTitle, blogPermalink: sBlogPermalink},
								  fnMoreData: this._getCommentsByPage.bind(this), fnAfterAddComment: this._afterAddComment.bind(this), 
								  oAfterAddCommentParams: {hostId: this._oOptions.iHostId, blogId: sBlogId}, fnCloseComments: this._closeComments.bind(this),	fnReportBad: this._reportBad,			
								  sObjName: this._sObjectName+'.commentPublishes[\''+sBlogId+'\']',
								  bSupportDeleteComment:true,
								  fnDelComment: this.delComment, oDelCommentParams:{blogId:sBlogId},
								  fnAfterDelComment:this.afterDelComment.bind(this), oAfterDelCommentParams:{blogId:sBlogId},
								  fnCloseCommentDiv: this.closeCssTabBarAll.bind(this)});
								
		if (this._oTester4PB) {
			if (oComments == null || oComments.length == 0) {
				this._test4PB("Com", "null");
			} else {
				var _aComId = oComments.pluck("id");
				this._test4PB("Com", _aComId, sBlogId);
			}
		}	
	},
	/**
	 * 根据分页的页面来取评论对象
	 * @private
	 * @param	{String}	sBlogId				日志id
	 * @param	{Number}	iLimit				从后台取的评论条数
	 * @param	{Number}	iOffset				从第几条评论开始取			
	 * @param	{Object}	fnPostPageComment	评论发布区div的id
	 * @return	{Void}	
	 */
	_getCommentsByPage: function(sBlogId, iLimit, iOffset, fnPostPageComment) {
		BlogBean.getComments(sBlogId, iLimit, iOffset, {
			callback:function(oDataFromServer) {
				fnPostPageComment(oDataFromServer);	
		    	if (this._oTester4PB) {
		    		if (oDataFromServer == null || oDataFromServer.length == 0) {
		    			this._test4PB("Com", "null");
		    		} else {
						var _aComId = oDataFromServer.pluck("id");
						this._test4PB("Com", _aComId, sBlogId);
		    		}
				}		
			}.bind(this)
		});	
	},
	/**
	 * 向后台添加评论
	 * @private
	 * @param	{Object}	oNewComment			需要添加的评论
	 * @param	{Object}	oParams				评论参数
	 * @param	{Object}	fnPostAddComment 	添加完毕后续函数
	 * @return	{Boolean}	
	 * @see		#checkOtherSiteUrl
	 * @see		#captchaWarning
	 */
	_addNewComment: function(oNewComment, oParams, fnPostAddComment) {
		//格式化评论区域返回的对象
		oNewComment.blogId = oNewComment.parentId;
		oNewComment.blogUserId = oParams.blogUserId;

		var _iFilterType = 0;
		var _oValcodeDiv = $("valcode"+oNewComment.parentId);
		var _sValcode;
		if (_oValcodeDiv != null)
			_sValcode = _oValcodeDiv.value;
		else
			_sValcode = -1;
		if (this._oOptions.iVisitorRank < Const.Rank.Friend) {
			var _bMatch = checkOtherSiteUrl(oNewComment.content);
			if (_bMatch) {
				alert(Local.Message.Blog[0]);
				fnPostAddComment(null);
				return false;
			}
		}
		BlogBean.addComment(oNewComment, _iFilterType, _sValcode,{
			callback:function(oDataFromServer) {	 	
				fnPostAddComment(oDataFromServer);
			},
			errorHandler:function(ex) {
				//验证码错误提示
			  	if (captchaWarning(ex, "$$_comsubmithint" + oNewComment.blogId)) {
			  		fnPostAddComment(null);
			  		return false;
			  	}
			  	//关键字过滤提示
			  	var _iFilter = filterWarning(ex);
			  	if (_iFilter == -1) {
			  		fnPostAddComment(null);
			  		return false;
			  	}		  
			  	fnPostAddComment(null);		
			}
		});	
	},
	/**
	 * 更新评论数目的显示
	 * @private
	 * @param	{Object}	oNewComment			需要添加的评论
	 * @param	{Object}	oParams				评论参数
	 * @return	{Void}
	 * @see		NEBlog.prevBlogLeft#showRecentComments
	 * @see		NetEase.CachePage#updateOne
	 */
	_afterAddComment: function (oNewComment, oParams) {
		//增加评论数显示
		var _oComCount = $("comCount_" + oParams.blogId);
		var _iCount = 0;
		if (_oComCount != null) {
			_iCount = _oComCount.innerHTML;
			_iCount = parseInt(_iCount) + 1;
			_oComCount.innerHTML = _iCount;
		}
		
		//更新缓存中的对应blog的评论数
		var _oItem = new Object();
		_oItem.id = oParams.blogId;
		_oItem.commentCount = _iCount;
		this._oBlogPager.updateOne(_oItem);
		new Effect.ScrollTo("openComDiv"+oParams.blogId, {duration:0.0});
	},
	/**
	 * 展开和关闭评论
	 * @private
	 * @param	{String}	sBlogId		日志id
	 * @param	(Object}	fnInit		初始化函数
	 * @return	{Void}
	 * @see		#_closeComments
	 * @see		Effect#BlindDown
	 */
	_upDownComments: function(sBlogId, fnInit) {
		if ($('openCom_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSucc = {success: false};
			this._iGid = 2;
			
			new Effect.BlindDown(
				'com_'+sBlogId,
				{
					stateId: sBlogId + "_$$S$$", 
					succObj: _oSucc, 
					duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 2) 
							this._closeComments(sBlogId); 
						if(fnInit != null) {
							fnInit();
						}					
					}.bind(this)
				}
			);		
			if (_oSucc.success)
				$('openCom_' + sBlogId).value = 1;		
			else
				$('openCom_' + sBlogId).value = 0;

		} else {
			this._closeComments(sBlogId);
		}
	},
	/**
	 * 关闭评论
	 * @private
	 * @param	{String}	sBlogId		日志id
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 */
	_closeComments: function(sBlogId) {
		if ($('openCom_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('com_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});

			if (_oSucc.success)
				$('openCom_' + sBlogId).value = 0;	
			else
				$('openCom_' + sBlogId).value = 1;
		}
	},
	/**
	 * 打开固定链接
	 * @private
	 * @param	{String}	sBlogId		日志id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		Effect#BlindDown
	 */
	openPermalink: function (sBlogId) {
		if ($('openPerma_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSucc = {success: false};
			this._iGid = 1;
			new Effect.BlindDown('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc , duration:0.5, 
				userCallBack: function(){
					if (this._iGid != 1) 
						this.closePermalink(sBlogId);
				}.bind(this) 
			});
			if (_oSucc.success) {
				$('openPerma_' + sBlogId).value = 1;	
			}
			else
				$('openPerma_' + sBlogId).value = 0;				
			
		} else {
			this.closePermalink(sBlogId);	
		}
	},
	
	/**
	 * 关闭固定链接显示
	 * @private
	 * @param	{String}	sBlogId		日志id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closePermalink: function(sBlogId) {
		if ($('openPerma_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});
			if (_oSucc.success) {
				$('openPerma_' + sBlogId).value = 0;	
			}else
				$('openPerma_' + sBlogId).value = 1;
		}
	},

	/**
	 * 打开引用通告
	 * @param	{String}	sBlogId			日志id
	 * @param	{String}	sTrackbackUrl	引用通告地址
	 * @return	{Void}
	 */
	openTrackbacks: function(sBlogId, sTrackbackUrl) {	
		if ($('openTrack_' + sBlogId).value == 2) {//数据尚未生成	
			BlogBean.getTrackbacks(sBlogId, {
				callback:function(oDataFromServer) {
					this._openTrackbacksCB(oDataFromServer, sTrackbackUrl, sBlogId);
				}.bind(this)
			});
		}else {
			if ($('openTrack_' + sBlogId).value == 0) {
				this._closeAll(sBlogId);	
				var _oSucc = {success: false};
				this._iGid = 3;
				new Effect.BlindDown('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 3) 
							this.closeTrackbacks(sBlogId);
					}.bind(this)
				});
				
				if (_oSucc.success) {
					$('openTrack_' + sBlogId).value = 1;				
				}else
					$('openTrack_' + sBlogId).value = 0;				
				
			} else {
				this.closeTrackbacks(sBlogId);	
			}
		}		
	},
	
	/**
	 * 从服务端获取blog的引用通告后的回调函数，为模板插入数据
	 * @private
	 * @param	{Array}		oTrackbacks		引用通告对象数组
	 * @param	{String}	sTrackbackUrl	引用通告地址
	 * @param	{String}	sBlogId			日志id
	 * @return	{Void}
	 * @see		#openTrackbacks
	 * @see		#_test4PB
	 * 
	 */
	_openTrackbacksCB: function(oTrackbacks, sTrackbackUrl, sBlogId) {
		
		var _oData = {tbs: oTrackbacks, tbUrl: sTrackbackUrl, blogId: sBlogId, 
					  hostName: this._oOptions.sHostName, objName: this._sObjectName,
					  visitorName: this._oOptions.sVisitorName, style: this._oOptions.sStyle,
					  hostId: this._oOptions.iHostId};
					  
		var _sResult = NEBlog.PrevBlog.trackbacksTemplate.process(_oData);
		$("track_" + sBlogId).innerHTML = _sResult;
		$('openTrack_' + sBlogId).value = 0;
		this.openTrackbacks(sBlogId, sTrackbackUrl);
		if (this._oTester4PB) {
			if (oTrackbacks == null || oTrackbacks.length == 0) {
				this._test4PB("Tb", "null");
			} else {
				var _aTbId = oTrackbacks.pluck("id");
				this._test4PB("Tb", _aTbId, sBlogId);
			}
		}	
	},
	/**
	 * 关闭引用通告
	 * @param	{String}	sBlogId			日志id
	 * @return	{Void}
	 */
	closeTrackbacks: function(sBlogId) {
		if ($('openTrack_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});
			if (_oSucc.success) {
				$('openTrack_' + sBlogId).value = 0;	
			}else
				$('openTrack_' + sBlogId).value = 1;
		}
	},

	/**
	 * 如果固定链接、评论、圈子和引用通告四个页面有打开的，则关闭它
	 * @param	{String}	sBlogId			日志id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		#_closeComments
	 * @see		#closeCircles
	 * @see		#closeTrackbacks
	 */
	_closeAll: function(sBlogId) {
		if ($('perma_' + sBlogId) != null &&
			$('openPerma_' + sBlogId).value == 1) {
			this.closePermalink(sBlogId);
		}
		else if ($('com_' + sBlogId) != null &&
			$('openCom_' + sBlogId).value == 1) {
			this._closeComments(sBlogId);
		} 
		else if ($('track_' + sBlogId) != null &&
			$('openTrack_' + sBlogId).value == 1) {
			this.closeTrackbacks(sBlogId);
		}
	},
	/**
	 * 转到tag页面
	 * @param	{Object}	oTag		tag对象
	 * @return	{Void}
	 */
	searchTagObj: function(oTag) {
		BlogBean.getHostAllTags({
			callback:function(oTags) {
		  		var _oUserTagList =  oTags;
		    	this._searchTagObjCb(oTag, _oUserTagList);
		  	}.bind(this)
		});	
		return false;
	},
	/**
	 * 查询tag所对应的跳转地址并跳转
	 * @param	{Object}	oTag			tag对象
	 * @param	{Object}	oUserTagList	用户所有的tag列表对象
	 * @return	{Boolean}	
	 * @see		#getTagObjByTagname
	 */
	_searchTagObjCb: function(oTag, oUserTagList) {
		var _oTag = getTagObjByTagname(oTag, -1, oUserTagList);
		if(_oTag==null)
			return false;

		//都改成全局搜索，by mml
		window.open("http://blog.163.com/search/?t=tag&q=" + encodeURIComponent(_oTag.tagName) + "&o=blog");
					
		//location.href = "prevTag.do?host=" + this._oOptions.sHostName + "&isGlobal=false&type=3&tagId=" + _oTag.id;
		return false;
	},
	/**
	 * 举报垃圾评论
	 * @param	{Object}	oReport			举报消息对象
	 * @param	{Object}	fnPostReport	举报后执行函数
	 * @return	{Void}
	 */
	_reportBad: function(oReport, fnPostReport) {
		PreUserReportBean.addUserReport(oReport, fnPostReport); 
	},
	
	/**
	 * 显示分享div add by gw
	 */
	
	showShareDiv:function(id, permalink){
		var url = 'http://' + UD.hostName + '.blog.163.com/' + permalink;
		if(jsWindowManager == null)
			jsWindowManager = new NetEase.JSWindowManager();
		if(g_shareDiv == null){		  		
			g_shareDiv = new NetEase.ShareByEmail({aId:'share'+id, jsWindowManager:jsWindowManager, visitorName:UD.visitorName,type:'blog', url:url}); 
	    }else{
	    	g_shareDiv.refreshNew({aId:'share'+id, type:'blog', url:url});
	    }
	},
	/**
	 * 测试
	 * @private
	 * @param	{String}	sKey		测试对象的键
	 * @param	{String}	vValues		测试对象的值
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PB: function(sKey, vValues, sRelValue) {
		if (!this._oTester4PB)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4PB.setArray("Blog", vValues);
				break;
			case "Com":
				this._oTester4PB.set2DArray("Com", vValues, "Blog", sRelValue);
				break;
			case "Tb":
				this._oTester4PB.set2DArray("Tb", vValues, "Blog", sRelValue);
				break;
		}	
	},
	

	upDownCssTabBar: function (sBlogId, sDivId){
		
		var _sOpenedDivId = this._oCssTabBarUpdownStatus[sBlogId];
		if(_sOpenedDivId==undefined || _sOpenedDivId==null || _sOpenedDivId=="") {
			//没有被展开过, 展开点击的Div
			Element.addClassName(sDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = sDivId;
			Element.addClassName('cssTabBar_'+ sBlogId,"bd1b");
		}else if(_sOpenedDivId == sDivId){
			//点击已经展开的Div
			Element.removeClassName(_sOpenedDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = "";
			Element.removeClassName('cssTabBar_'+ sBlogId,"bd1b");
		}else{
			//本tools已有展开的条目, 先展开同一tools中的另一条目
			Element.removeClassName(_sOpenedDivId,"s");
			Element.addClassName(sDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = sDivId;
		}
	},
	closeCssTabBarAll: function(sBlogId){
		this._oCssTabBarUpdownStatus[sBlogId] = "";
		Element.removeClassName('openComDiv' + sBlogId,"s");
		Element.removeClassName('openTbDiv' + sBlogId,"s");
		Element.removeClassName('openPermaDiv' + sBlogId,"s");
		Element.removeClassName('cssTabBar_'+ sBlogId,"bd1b");
	},
	
	delComment: function(sCommentId, oParams, fnPostDelComment){
		BlogBean.deleteComment(sCommentId, oParams.blogId, {
			  callback:function(oDataFromServer) {
			    fnPostDelComment(oDataFromServer);
			  }
			});
	},
	
	afterDelComment: function(oParams){
		var _iCount =  parseInt($("comCount_" + oParams.blogId).innerHTML)-1;
		$("comCount_" + oParams.blogId).innerHTML = _iCount;
		//更新缓存中的对应blog的评论数
		var _oItem = new Object();
		_oItem.id = oParams.blogId;
		_oItem.commentCount = _iCount;
		this._oBlogPager.updateOne(_oItem);
	}	
}

