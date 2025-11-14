document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const generateBtn = document.getElementById('generateBtn');
    const svgContainer = document.getElementById('infoGraphic');
    const bgColorOuter = document.getElementById('bgColorOuter');
    const bgColorOuterHex = document.getElementById('bgColorOuterHex');
    const fillSampleDataBtn = document.getElementById('fillSampleData');
    const gradientColorDeep = document.getElementById('gradientColorDeep');
    const gradientColorLight = document.getElementById('gradientColorLight');
    const gradientColorDeepHex = document.getElementById('gradientColorDeepHex');
    const gradientColorLightHex = document.getElementById('gradientColorLightHex');
    const rowBgColorDeep = document.getElementById('rowBgColorDeep');
    const rowBgColorLight = document.getElementById('rowBgColorLight');
    const rowBgColorDeepHex = document.getElementById('rowBgColorDeepHex');
    const rowBgColorLightHex = document.getElementById('rowBgColorLightHex');
    const toothSize = document.getElementById('toothSize');
    const toothSizeValue = document.getElementById('toothSizeValue');
    
    // 表头参数滑块控件
    const headerLineSpacing = document.getElementById('headerLineSpacing');
    const headerLineSpacingValue = document.getElementById('headerLineSpacingValue');
    const headerTopPadding = document.getElementById('headerTopPadding');
    const headerTopPaddingValue = document.getElementById('headerTopPaddingValue');
    const headerBottomPadding = document.getElementById('headerBottomPadding');
    const headerBottomPaddingValue = document.getElementById('headerBottomPaddingValue');
    
    // 最后一列字体大小滑块控件
    const lastColumnFontSize = document.getElementById('lastColumnFontSize');
    const lastColumnFontSizeValue = document.getElementById('lastColumnFontSizeValue');
    
    // 副标题字号滑块控件
    const subtitleFontSize = document.getElementById('subtitleFontSize');
    const subtitleFontSizeValue = document.getElementById('subtitleFontSizeValue');
    
    // 配色模板定义
    const colorTemplates = {
        default: {
            outerBg: '#f5f5f5',
            gradientDeep: '#0052cc',
            gradientLight: '#4169E1',
            rowBgColorDeep: '#f0f7ff',
            rowBgColorLight: '#ffffff'
        },
        red: {
            outerBg: '#902622',
            gradientDeep: '#bd1803',
            gradientLight: '#cb2914',
            rowBgColorDeep: '#fee8e8',
            rowBgColorLight: '#f8f2f2'
        },
        blue: {
            outerBg: '#24439a',
            gradientDeep: '#1e3dba',
            gradientLight: '#0f41d8',
            rowBgColorDeep: '#e8f0fe',
            rowBgColorLight: '#f3f5f9'
        },
        purple: {
            outerBg: '#2b0b52',
            gradientDeep: '#7520be',
            gradientLight: '#64149e',
            rowBgColorDeep: '#ebdff0',
            rowBgColorLight: '#fcf8fe'
        }
    };
    
    // 选择模板按钮事件监听
    const templateButtons = document.querySelectorAll('.template-btn');
    templateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他按钮的active类
            templateButtons.forEach(b => b.classList.remove('active'));
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 获取选中的模板
            const template = this.getAttribute('data-template');
            applyColorTemplate(template);
        });
    });
    
    // 应用颜色模板
    function applyColorTemplate(templateName) {
        if (!colorTemplates[templateName]) return;
        
        const template = colorTemplates[templateName];
        
        // 更新颜色选择器和十六进制输入框
        bgColorOuter.value = template.outerBg;
        bgColorOuterHex.value = template.outerBg;
        
        gradientColorDeep.value = template.gradientDeep;
        gradientColorDeepHex.value = template.gradientDeep;
        
        gradientColorLight.value = template.gradientLight;
        gradientColorLightHex.value = template.gradientLight;
        
        rowBgColorDeep.value = template.rowBgColorDeep;
        rowBgColorDeepHex.value = template.rowBgColorDeep;
        
        rowBgColorLight.value = template.rowBgColorLight;
        rowBgColorLightHex.value = template.rowBgColorLight;
    }
    
    // 设置默认模板为激活状态
    const defaultTemplateBtn = document.querySelector('.template-btn[data-template="default"]');
    if (defaultTemplateBtn) {
        defaultTemplateBtn.classList.add('active');
    }
    
    // 账号logo路径和内层背景图片路径
    const accountLogoSrc = 'https://u.thsi.cn/imgsrc/share/d571605cef6f8a256fa06403705aed7c.png';
    const insideBgSrc = 'https://u.thsi.cn/imgsrc/share/88671c9f8628b670e18d89d9620dca4c.jpg';
    
    // 事件监听器
    generateBtn.addEventListener('click', generateInfoGraphic);
    
    // 颜色选择器事件监听
    bgColorOuter.addEventListener('input', function() {
        bgColorOuterHex.value = this.value;
        clearTemplateSelection();
    });
    
    gradientColorDeep.addEventListener('input', function() {
        gradientColorDeepHex.value = this.value;
        clearTemplateSelection();
    });
    
    gradientColorLight.addEventListener('input', function() {
        gradientColorLightHex.value = this.value;
        clearTemplateSelection();
    });
    
    rowBgColorDeep.addEventListener('input', function() {
        rowBgColorDeepHex.value = this.value;
        clearTemplateSelection();
    });
    
    rowBgColorLight.addEventListener('input', function() {
        rowBgColorLightHex.value = this.value;
        clearTemplateSelection();
    });
    
    // 颜色十六进制输入框事件监听
    bgColorOuterHex.addEventListener('input', function() {
        updateColorFromHexInput(this, bgColorOuter);
        clearTemplateSelection();
    });
    bgColorOuterHex.addEventListener('blur', function() {
        formatHexInput(this, bgColorOuter);
    });
    
    gradientColorDeepHex.addEventListener('input', function() {
        updateColorFromHexInput(this, gradientColorDeep);
        clearTemplateSelection();
    });
    gradientColorDeepHex.addEventListener('blur', function() {
        formatHexInput(this, gradientColorDeep);
    });
    
    gradientColorLightHex.addEventListener('input', function() {
        updateColorFromHexInput(this, gradientColorLight);
        clearTemplateSelection();
    });
    gradientColorLightHex.addEventListener('blur', function() {
        formatHexInput(this, gradientColorLight);
    });
    
    rowBgColorDeepHex.addEventListener('input', function() {
        updateColorFromHexInput(this, rowBgColorDeep);
        clearTemplateSelection();
    });
    rowBgColorDeepHex.addEventListener('blur', function() {
        formatHexInput(this, rowBgColorDeep);
    });
    
    rowBgColorLightHex.addEventListener('input', function() {
        updateColorFromHexInput(this, rowBgColorLight);
        clearTemplateSelection();
    });
    rowBgColorLightHex.addEventListener('blur', function() {
        formatHexInput(this, rowBgColorLight);
    });
    
    // 锯齿大小滑块事件监听
    if (toothSize && toothSizeValue) {
        toothSize.addEventListener('input', function() {
            toothSizeValue.textContent = this.value;
        });
    }
    
    // 表头参数滑块事件监听
    if (headerLineSpacing && headerLineSpacingValue) {
        headerLineSpacing.addEventListener('input', function() {
            headerLineSpacingValue.textContent = this.value;
        });
    }
    
    if (headerTopPadding && headerTopPaddingValue) {
        headerTopPadding.addEventListener('input', function() {
            headerTopPaddingValue.textContent = this.value;
        });
    }
    
    if (headerBottomPadding && headerBottomPaddingValue) {
        headerBottomPadding.addEventListener('input', function() {
            headerBottomPaddingValue.textContent = this.value;
        });
    }
    
    // 最后一列字体大小滑块事件监听
    if (lastColumnFontSize && lastColumnFontSizeValue) {
        lastColumnFontSize.addEventListener('input', function() {
            lastColumnFontSizeValue.textContent = this.value;
        });
    }
    
    // 副标题字号滑块事件监听
    if (subtitleFontSize && subtitleFontSizeValue) {
        subtitleFontSize.addEventListener('input', function() {
            subtitleFontSizeValue.textContent = this.value;
        });
    }
    
    // 清除模板选择状态的函数
    function clearTemplateSelection() {
        templateButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    // 辅助函数：验证并更新颜色选择器
    function updateColorFromHexInput(hexInput, colorPicker) {
        let value = hexInput.value;
        
        // 如果不以#开头，添加#
        if (value && !value.startsWith('#')) {
            value = '#' + value;
            hexInput.value = value;
        }
        
        // 验证是否为有效的颜色代码
        if (isValidHexColor(value)) {
            colorPicker.value = value;
        }
    }
    
    // 辅助函数：在失焦时格式化十六进制输入
    function formatHexInput(hexInput, colorPicker) {
        let value = hexInput.value.trim();
        
        // 如果为空，使用颜色选择器的当前值
        if (!value) {
            hexInput.value = colorPicker.value;
            return;
        }
        
        // 如果不以#开头，添加#
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        
        // 验证是否为有效的颜色代码
        if (isValidHexColor(value)) {
            colorPicker.value = value;
            hexInput.value = value.toLowerCase(); // 统一使用小写
        } else {
            // 如果无效，恢复为颜色选择器的值
            hexInput.value = colorPicker.value;
        }
    }
    
    // 辅助函数：检查是否为有效的十六进制颜色代码
    function isValidHexColor(color) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    }
    
    // 填充示例数据按钮事件监听
    if (fillSampleDataBtn) {
        fillSampleDataBtn.addEventListener('click', fillSampleLogoData);
    }
    
    // 填充示例Logo数据
    function fillSampleLogoData() {
        const sampleData = [
            {
                "name": "德邦科技",
                "code": "688035",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/68dcd335-95d5-48f2-bd1b-d6e1e73c5457.png"
            },
            {
                "name": "中电港",
                "code": "001287",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/a92da8fc-aa92-402a-aaba-9e95039f859e.png"
            },
            {
                "name": "北斗星通",
                "code": "002151",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/d3f1edc2-7924-4c50-aa0c-df9d912aceef.png"
            }
        ];
        
        const companyLogosTextarea = document.getElementById('companyLogos');
        if (companyLogosTextarea) {
            companyLogosTextarea.value = JSON.stringify(sampleData, null, 2);
        }
    }
    
    // 预加载图片
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`无法加载图片: ${src}`));
            img.src = src;
        });
    }
    
    // 生成信息图
    function generateInfoGraphic() {
        // 获取用户输入
        const mainTitleText = document.getElementById('mainTitleInput').value || 'F10掘金'; // 获取主标题，提供默认值
        const subtitle = document.getElementById('subtitle').value || '数据分析报告';
        const copyright = document.getElementById('copyright').value || '版权所有 © F10掘金';
        
        // 获取是否显示公司Logo的选项
        const showCompanyLogos = document.getElementById('showCompanyLogos').checked;
        
        // 获取颜色值 - 优先使用输入框中的值，如果无效则使用颜色选择器的值
        const outerBgColor = isValidHexColor(bgColorOuterHex.value) ? bgColorOuterHex.value : bgColorOuter.value;
        const gradientDeepColor = isValidHexColor(gradientColorDeepHex.value) ? gradientColorDeepHex.value : gradientColorDeep.value;
        const gradientLightColor = isValidHexColor(gradientColorLightHex.value) ? gradientColorLightHex.value : gradientColorLight.value;
        const rowBgColorDeepValue = isValidHexColor(rowBgColorDeepHex.value) ? rowBgColorDeepHex.value : rowBgColorDeep.value;
        const rowBgColorLightValue = isValidHexColor(rowBgColorLightHex.value) ? rowBgColorLightHex.value : rowBgColorLight.value;
        
        // 获取颜色规则
        const colorRule = document.getElementById('colorRule') ? parseInt(document.getElementById('colorRule').value) : 1;
        
        // 获取锯齿大小
        const toothSizeValue = document.getElementById('toothSize') ? parseInt(document.getElementById('toothSize').value) : 40;
        
        // 获取表头参数设置
        const headerLineSpacingValue = document.getElementById('headerLineSpacing') ? 
            parseInt(document.getElementById('headerLineSpacing').value) : 10;
        const headerTopPaddingValue = document.getElementById('headerTopPadding') ? 
            parseInt(document.getElementById('headerTopPadding').value) : 10;
        const headerBottomPaddingValue = document.getElementById('headerBottomPadding') ? 
            parseInt(document.getElementById('headerBottomPadding').value) : 10;
            
        // 获取副标题字号
        const subtitleFontSizeValue = document.getElementById('subtitleFontSize') ? 
            parseInt(document.getElementById('subtitleFontSize').value) : 130;
            
        // 获取最后一列字体大小
        const lastColumnFontSizeValue = document.getElementById('lastColumnFontSize') ? 
            parseInt(document.getElementById('lastColumnFontSize').value) : 30;
        
        // 获取主图片
        const mainImageFile = document.getElementById('mainImage').files[0];
        
        // 获取Excel文件
        const excelFile = document.getElementById('excelFile').files[0];
        
        // 获取公司Logo数据
        const companyLogosData = document.getElementById('companyLogos').value;
        let companyLogosMap = new Map(); // 用于存储公司名称到logo URL的映射
        let logoUrls = []; // 存储需要预加载的logo URL
        
        // 如果有公司Logo数据，解析JSON
        if (companyLogosData.trim()) {
            try {
                const companyLogos = JSON.parse(companyLogosData);
                // 创建公司名称到logo URL的映射
                companyLogos.forEach(company => {
                    if (company.name && company.company_logo) {
                        companyLogosMap.set(company.name, company.company_logo);
                        logoUrls.push(company.company_logo);
                    }
                });
            } catch (error) {
                console.error('解析公司Logo数据时出错:', error);
                alert('公司Logo数据格式有误，请检查JSON格式');
                return;
            }
        }
        
        // 检查是否上传了Excel文件
        if (!excelFile) {
            alert('请上传Excel数据文件');
            return;
        }
        
        // 显示加载提示
        const loadingDiv = document.createElement('div');
        loadingDiv.style.position = 'fixed';
        loadingDiv.style.top = '50%';
        loadingDiv.style.left = '50%';
        loadingDiv.style.transform = 'translate(-50%, -50%)';
        loadingDiv.style.padding = '20px';
        loadingDiv.style.background = 'rgba(0,0,0,0.7)';
        loadingDiv.style.color = 'white';
        loadingDiv.style.borderRadius = '5px';
        loadingDiv.style.zIndex = '9999';
        loadingDiv.textContent = '正在加载公司Logo和数据...';
        document.body.appendChild(loadingDiv);
        
        // 处理图片、Excel数据和预加载Logo
        Promise.all([
            mainImageFile ? readImageAsDataURL(mainImageFile) : Promise.resolve(null),
            readExcelFile(excelFile),
            // 预加载所有公司Logo图片，忽略加载失败的图片
            ...logoUrls.map(url => preloadImage(url).catch(() => null))
        ]).then(results => {
            // 移除加载提示
            document.body.removeChild(loadingDiv);
            
            const mainImageSrc = results[0];
            const excelResult = results[1];
            const excelData = excelResult.data;
            const excelHeaders = excelResult.headers;
            
            // 检查Excel数据是否有效
            if (!excelData || excelData.length === 0) {
                alert('Excel文件无数据或格式不正确');
                return;
            }
            
            const columns = Object.keys(excelData[0]);
            if (columns.length < 2) {
                alert('Excel文件至少需要包含两列数据');
                return;
            }
            
            // 生成SVG信息图
            createSVGInfoGraphic(svgContainer, {
                mainTitle: mainTitleText, // 传递主标题
                subtitle,
                mainImageSrc,
                copyright,
                excelData,
                excelHeaders,
                outerBgColor,
                gradientDeepColor,
                gradientLightColor,
                rowBgColorDeep: rowBgColorDeepValue,
                rowBgColorLight: rowBgColorLightValue,
                companyLogosMap,
                toothSize: toothSizeValue,
                colorRule: colorRule,
                headerLineSpacing: headerLineSpacingValue,
                headerTopPadding: headerTopPaddingValue,
                headerBottomPadding: headerBottomPaddingValue,
                subtitleFontSize: subtitleFontSizeValue,
                showCompanyLogos: showCompanyLogos, // 传递显示公司Logo的选项
                lastColumnFontSize: lastColumnFontSizeValue // 传递最后一列字体大小
            });
        }).catch(error => {
            // 移除加载提示
            if (document.body.contains(loadingDiv)) {
                document.body.removeChild(loadingDiv);
            }
            
            console.error('生成信息图时出错:', error);
            alert('生成信息图时出错，请查看控制台获取详细信息');
        });
    }
    
    // 读取图片为DataURL
    function readImageAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // 读取Excel文件并解析数据
    function readExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = e.target.result;
                    // 使用raw: true保留原始数据格式
                    const workbook = XLSX.read(data, { type: 'binary' });
                    
                    // 获取第一个工作表
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    
                    // 尝试获取表头行并处理可能的换行符
                    const rawHeaderRow = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] || [];
                    
                    // 处理表头中可能的换行符
                    // Excel中的换行符通常是ASCII码为10的字符(LF)
                    // 在某些情况下，可能会变成"\r\n"或者其他形式
                    const headerRow = rawHeaderRow.map(header => {
                        if (header && typeof header === 'string') {
                            // 统一将各种可能的换行符替换为标准的"\n"
                            return header.replace(/\r\n|\r|\n/g, '\n');
                        }
                        return header;
                    });
                    
                    // 使用raw: false选项保留原始值而不是转换的值
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
                    
                    // 返回包含数据和列名的对象
                    resolve({
                        data: jsonData,
                        headers: headerRow
                    });
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        });
    }
    
    // 创建小票锯齿边缘的路径
    function createTicketPath(x, y, width, height, toothSize, decorativeLineY) {
        // 固定锯齿深度为常量，不随toothSize变化
        const toothDepth = 20;
        
        // 为了确保两侧都完全对称，计算锯齿数量时需要注意
        // 两端都应该是锯齿的"峰"
        // 计算需要绘制的完整"峰-谷-峰"单元数量
        const fullToothCount = Math.floor((width) / toothSize);
        
        // 调整实际锯齿大小以均匀分布
        const adjustedToothSize = width / fullToothCount;
        
        // 从左上角开始路径（第一个峰的顶点）
        let path = `M ${x},${y}`;
        
        // 遍历绘制所有锯齿
        for (let i = 0; i < fullToothCount; i++) {
            // 计算当前锯齿的起始x坐标
            const startX = x + (i * adjustedToothSize);
            
            // 绘制从峰到谷（向下）
            path += ` L ${startX + (adjustedToothSize/2)},${y + toothDepth}`;
            
            // 绘制从谷到下一个峰（向上），如果不是最后一个周期
            if (i < fullToothCount - 1) {
                path += ` L ${startX + adjustedToothSize},${y}`;
            } else {
                // 如果是最后一个周期，直接连接到右上角点
                path += ` L ${x + width},${y}`;
            }
        }
        
        // 计算半圆缺口相对于小票顶部的位置
        const notchY = decorativeLineY ? (decorativeLineY - y) : 0;
        // 半圆缺口的半径
        const notchRadius = 15;
        
        // 右侧垂直线（添加半圆缺口）
        if (decorativeLineY && notchY > 0 && notchY < height) {
            // 从右上角到缺口上方
            path += ` L ${x + width},${y + notchY - notchRadius}`;
            // 绘制右侧半圆缺口（顺时针弧）- 向内凹的半圆
            path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x + width},${y + notchY + notchRadius}`;
            // 从缺口下方到右下角
            path += ` L ${x + width},${y + height}`;
        } else {
            // 没有缺口，直接绘制右侧垂直线
            path += ` L ${x + width},${y + height}`;
        }
        
        // 底部水平线
        path += ` L ${x},${y + height}`;
        
        // 左侧垂直线（添加半圆缺口）
        if (decorativeLineY && notchY > 0 && notchY < height) {
            // 从左下角到缺口下方
            path += ` L ${x},${y + notchY + notchRadius}`;
            // 绘制左侧半圆缺口（顺时针弧）- 向内凹的半圆
            path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x},${y + notchY - notchRadius}`;
            // 从缺口上方到左上角
            path += ` L ${x},${y}`;
        } else {
            // 没有缺口，直接回到起点
            path += ` L ${x},${y}`;
        }
        
        // 闭合路径
        path += ` Z`;
        
        return path;
    }
    
    // 创建SVG信息图
    function createSVGInfoGraphic(container, options) {
        const {
            mainTitle, // 接收主标题
            subtitle,
            mainImageSrc,
            copyright,
            excelData,
            excelHeaders,
            outerBgColor,
            gradientDeepColor,
            gradientLightColor,
            rowBgColorDeep,
            rowBgColorLight,
            companyLogosMap,
            toothSize,
            colorRule,
            headerLineSpacing = 10,
            headerTopPadding = 10,
            headerBottomPadding = 10,
            subtitleFontSize = 130,
            showCompanyLogos = true, // 默认为true，表示显示公司Logo
            lastColumnFontSize = 30 // 默认为30，最后一列的字体大小
        } = options;
        
        // 清空容器
        container.innerHTML = '';
        
        // SVG宽度 (固定)
        const svgWidth = 1181;
        const padding = 65;
        const innerWidth = svgWidth - (padding * 2);
        
        // 定义各区域的固定高度和位置
        const headerY = padding + 60;
        const headerHeight = 60;
        
        const titleY = headerY + headerHeight + 160; 
        const titleHeight = 130;
        
        const imageY = titleY + titleHeight + 30;
        const imageHeight = 450;
        const imageWidth = innerWidth - 56;
        
        // 图片区域与数据表格间的装饰线位置
        const decorativeLineY = imageY + imageHeight + 30;
        
        // 检查是否存在换行的表头
        let hasMultilineHeader = false;
        let maxHeaderLines = 1;
        if (excelHeaders && excelHeaders.length > 0) {
            for (const header of excelHeaders) {
                if (header && typeof header === 'string' && header.includes('\n')) {
                    hasMultilineHeader = true;
                    const lineCount = header.split('\n').length;
                    maxHeaderLines = Math.max(maxHeaderLines, lineCount);
                }
            }
        }
        
        // 表头相关参数 - 使用用户从界面设置的值
        const headerLineHeight = 30;   // 每行文字高度
        // 使用用户从UI传入的值
        // 行间距、上边距、下边距
        
        // 表头起始位置
        const tableHeaderY = decorativeLineY + 30; 
        
        // 计算表头总高度
        // 表头高度 = 上边距 + (行数 * 行高 + (行数-1) * 行间距) + 下边距
        const tableHeaderTextHeight = maxHeaderLines * headerLineHeight + 
                                    (maxHeaderLines - 1) * headerLineSpacing;
        const tableHeaderHeight = hasMultilineHeader ? 
            (headerTopPadding + tableHeaderTextHeight + headerBottomPadding) : 50;
        
        // 数据区域根据表头高度下移
        const dataY = tableHeaderY + tableHeaderHeight + 20;
        const rowHeight = 88; // 行高改为88px
        const rowSpacing = 10; // 行间距10px
        
        // 计算数据表格的总高度（考虑行间距）
        const dataTableHeight = (excelData.length * (rowHeight + rowSpacing)) - rowSpacing + 30; // 额外空间用于底部间距，减去最后一行的行间距
        
        // 计算SVG总高度 = 上面所有内容的高度 + 底部边距 + 额外空间用于小票外的版权区域
        const extraSpaceForCopyright = 100; // 为小票区域外的版权区域预留空间
        const svgHeight = dataY + dataTableHeight + padding + extraSpaceForCopyright; // 减少内部高度，去掉copyrightHeight
        const innerHeight = svgHeight - (padding * 2) - extraSpaceForCopyright; // 确保内层小票不包含额外空间
        
        // 设置SVG属性
        container.setAttribute('width', svgWidth);
        container.setAttribute('height', svgHeight);
        container.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
        
        // 创建渐变定义
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        container.appendChild(defs);
        
        // 创建内层背景图片模式
        const insideBgPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        insideBgPattern.setAttribute('id', 'insideBg');
        insideBgPattern.setAttribute('patternUnits', 'userSpaceOnUse');
        insideBgPattern.setAttribute('width', innerWidth);
        insideBgPattern.setAttribute('height', innerHeight);
        
        const insideBgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        insideBgImage.setAttribute('href', insideBgSrc);
        insideBgImage.setAttribute('width', innerWidth);
        insideBgImage.setAttribute('height', innerHeight);
        insideBgImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        
        insideBgPattern.appendChild(insideBgImage);
        defs.appendChild(insideBgPattern);
        
        // 创建阴影滤镜
        const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        shadowFilter.setAttribute('id', 'ticketShadow');
        shadowFilter.setAttribute('x', '-20%');
        shadowFilter.setAttribute('y', '-20%');
        shadowFilter.setAttribute('width', '140%');
        shadowFilter.setAttribute('height', '140%');
        
        const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '10');
        feDropShadow.setAttribute('stdDeviation', '10');
        feDropShadow.setAttribute('flood-color', 'rgba(0,0,0,0.5)');
        
        shadowFilter.appendChild(feDropShadow);
        defs.appendChild(shadowFilter);
        
        // 创建副标题渐变（从上到下）
        const subtitleGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        subtitleGradient.setAttribute('id', 'subtitleGradient');
        subtitleGradient.setAttribute('x1', '0%');
        subtitleGradient.setAttribute('y1', '0%');
        subtitleGradient.setAttribute('x2', '0%');
        subtitleGradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', `stop-color:${gradientDeepColor}`);
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', `stop-color:${gradientLightColor}`);
        
        subtitleGradient.appendChild(stop1);
        subtitleGradient.appendChild(stop2);
        defs.appendChild(subtitleGradient);
        
        // 创建柱状图渐变（从右到左）
        const barGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        barGradient.setAttribute('id', 'barGradient');
        barGradient.setAttribute('x1', '100%');
        barGradient.setAttribute('y1', '0%');
        barGradient.setAttribute('x2', '0%');
        barGradient.setAttribute('y2', '0%');
        
        const barStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        barStop1.setAttribute('offset', '0%');
        barStop1.setAttribute('style', `stop-color:${gradientDeepColor}`);
        
        const barStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        barStop2.setAttribute('offset', '100%');
        barStop2.setAttribute('style', `stop-color:${gradientLightColor}`);
        
        barGradient.appendChild(barStop1);
        barGradient.appendChild(barStop2);
        defs.appendChild(barGradient);
        
        // 外层背景
        const outerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        outerBackground.setAttribute('width', svgWidth);
        outerBackground.setAttribute('height', svgHeight);
        outerBackground.setAttribute('fill', outerBgColor);
        container.appendChild(outerBackground);
        
        // 内层小票样式背景
        const ticketPath = createTicketPath(padding, padding, innerWidth, innerHeight, toothSize, decorativeLineY);
        const innerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerBackground.setAttribute('d', ticketPath);
        innerBackground.setAttribute('fill', 'url(#insideBg)');
        innerBackground.setAttribute('filter', 'url(#ticketShadow)'); // 添加阴影效果
        container.appendChild(innerBackground);
        
        // 移除单独添加的圆形覆盖层，改为让阴影效果自然应用于整个小票路径
        
        // 头部区域（账号名称和Logo）
        // 账号Logo
        const logoImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        logoImage.setAttribute('x', padding + 28);
        logoImage.setAttribute('y', headerY - 10); // 稍微向上调整位置
        logoImage.setAttribute('width', svgWidth - (padding + 28) * 2); // 宽度设为整个可用区域
        logoImage.setAttribute('height', 80); // 增加高度以保持比例
        logoImage.setAttribute('href', accountLogoSrc);
        logoImage.setAttribute('preserveAspectRatio', 'xMidYMid meet'); // 居中显示并保持比例
        container.appendChild(logoImage);
        
        // 主标题 (根据传入值设置)
        const mainTitleSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'text'); // 重命名变量以避免冲突
        mainTitleSvgElement.setAttribute('x', padding + 28);
        mainTitleSvgElement.setAttribute('y', titleY);
        mainTitleSvgElement.setAttribute('font-size', '130');
        mainTitleSvgElement.setAttribute('font-weight', 'bold');
        mainTitleSvgElement.setAttribute('font-family', 'MiSans-Bold, sans-serif');
        mainTitleSvgElement.setAttribute('fill', '#000000');
        mainTitleSvgElement.textContent = mainTitle; // 使用传入的主标题值
        container.appendChild(mainTitleSvgElement);
        
        // 副标题处理（支持特殊标记的颜色）
        // 解析副标题中的特殊标记 [[文本]] 来应用渐变色
        const subTitleParts = [];
        let currentIndex = 0;
        const regex = /\[\[(.*?)\]\]/g;
        let match;
        let lastIndex = 0;
        
        // 解析副标题中的特殊标记
        while ((match = regex.exec(subtitle)) !== null) {
            // 添加标记前的普通文本
            if (match.index > lastIndex) {
                subTitleParts.push({
                    text: subtitle.substring(lastIndex, match.index),
                    isHighlighted: false
                });
            }
            
            // 添加需要高亮的文本（去掉标记）
            subTitleParts.push({
                text: match[1],
                isHighlighted: true
            });
            
            lastIndex = match.index + match[0].length;
        }
        
        // 添加最后一部分普通文本
        if (lastIndex < subtitle.length) {
            subTitleParts.push({
                text: subtitle.substring(lastIndex),
                isHighlighted: false
            });
        }
        
        // 如果没有特殊标记，就整体作为一个部分
        if (subTitleParts.length === 0) {
            subTitleParts.push({
                text: subtitle,
                isHighlighted: false
            });
        }
        
        // 创建单个text元素，使用tspan实现部分高亮
        const subTitleElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subTitleElement.setAttribute('x', padding + 28);
        subTitleElement.setAttribute('y', titleY + 130);
        subTitleElement.setAttribute('font-size', subtitleFontSize); // 使用传入的字号
        subTitleElement.setAttribute('font-weight', 'bold');
        subTitleElement.setAttribute('font-family', 'MiSans-Bold, sans-serif');
        
        // 添加各部分文本作为tspan
        subTitleParts.forEach(part => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = part.text;
            
            // 应用颜色：高亮文本使用渐变色，普通文本使用黑色
            if (part.isHighlighted) {
                tspan.setAttribute('fill', 'url(#subtitleGradient)');
            } else {
                tspan.setAttribute('fill', '#000000');
            }
            
            subTitleElement.appendChild(tspan);
        });
        
        container.appendChild(subTitleElement);
        
        // 图片区域
        if (mainImageSrc) {
            const mainImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            mainImage.setAttribute('x', padding + 28);
            mainImage.setAttribute('y', imageY);
            mainImage.setAttribute('width', imageWidth);
            mainImage.setAttribute('height', imageHeight);
            mainImage.setAttribute('href', mainImageSrc);
            mainImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // 添加圆角效果
            const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            clipPath.setAttribute('id', 'roundedCorner');
            const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            clipRect.setAttribute('x', padding + 28);
            clipRect.setAttribute('y', imageY);
            clipRect.setAttribute('width', imageWidth);
            clipRect.setAttribute('height', imageHeight);
            clipRect.setAttribute('rx', 20);
            clipRect.setAttribute('ry', 20);
            clipPath.appendChild(clipRect);
            container.appendChild(clipPath);
            
            mainImage.setAttribute('clip-path', 'url(#roundedCorner)');
            container.appendChild(mainImage);
        }
        
        // 装饰线 - 图片区域和数据表格之间
        const decorativeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        decorativeLine.setAttribute('x1', padding + 28);
        decorativeLine.setAttribute('y1', decorativeLineY);
        decorativeLine.setAttribute('x2', svgWidth - padding - 30);
        decorativeLine.setAttribute('y2', decorativeLineY);
        decorativeLine.setAttribute('stroke', '#aaa');
        decorativeLine.setAttribute('stroke-width', '2');
        decorativeLine.setAttribute('stroke-dasharray', '5,3');
        container.appendChild(decorativeLine);
        
        // 渲染数据表格头
        if (excelData && excelData.length > 0) {
            const columns = Object.keys(excelData[0]);
            
            // 动态生成列名，从Excel的字段名获取
            let columnNames = [];
            
            // 如果有Excel表头，使用它们作为列名
            if (excelHeaders && excelHeaders.length > 0) {
                columnNames = excelHeaders;
            } else {
                // 如果没有表头或获取失败，使用默认列名
                for (let i = 0; i < columns.length; i++) {
                    if (i === 0) {
                        columnNames.push('公司名称');
                    } else if (i === 1) {
                        columnNames.push('资本开支(亿元)');
                    } else if (i === 2) {
                        columnNames.push('资本开支同比变化(%)');
                    } else {
                        columnNames.push(`数据${i}`);
                    }
                }
            }
            
            // 新的列宽分配逻辑
            // 1. 确定第一列宽度（固定值或根据是否显示logo调整）
            const firstColWidth = showCompanyLogos ? 250 : 170; // 不显示logo时减少第一列宽度
            
            // 2. 判断最后一列是否为文本列
            const isLastColText = columns.length > 1 && (() => {
                let textCount = 0;
                const sampleSize = Math.min(excelData.length, 5);
                for (let j = 0; j < sampleSize; j++) {
                    const value = excelData[j][columns[columns.length - 1]];
                    if (value && isNaN(parseFloat(value))) {
                        textCount++;
                    }
                }
                return textCount > sampleSize / 2;
            })();
            
            // 3. 计算第三列及以后列的宽度
            const colWidths = new Array(columns.length).fill(0);
            colWidths[0] = firstColWidth;
            
            // 列宽分析每列文本内容长度
            const colTextLengths = [];
            for (let i = 2; i < columns.length; i++) {
                // 计算列标题和数据的最大长度
                const titleText = columnNames[i] || '';
                
                // 处理多行表头，取最长的一行计算宽度
                let maxTitleLength = 0;
                if (titleText.includes('\n')) {
                    const titleLines = titleText.split('\n');
                    for (const line of titleLines) {
                        const lineLength = estimateTextWidth(line, 30, 15);
                        maxTitleLength = Math.max(maxTitleLength, lineLength);
                    }
                } else {
                    // 中文字符宽度估算为30像素，英文字符为15像素
                    maxTitleLength = estimateTextWidth(titleText, 30, 15);
                }
                
                // 计算数据最大长度
                let maxDataLength = 0;
                excelData.forEach(row => {
                    const dataStr = String(row[columns[i]] || '');
                    
                    // 检测文本中是否含有特殊模式（如"芯片、算力"这样的组合）
                    const containsSpecialPattern = /[、，,]/.test(dataStr);
                    
                    // 中文字符宽度估算为26像素，英文字符为13像素
                    // 针对最后一列，按照字体大小的比例调整宽度
                    const charWidthScaleFactor = i === columns.length - 1 ? (lastColumnFontSize / 30) : 1;
                    let dataLength = estimateTextWidth(dataStr, 26 * charWidthScaleFactor, 13 * charWidthScaleFactor);
                    
                    // 对于特殊模式，增加额外宽度以避免文本重叠
                    if (containsSpecialPattern) {
                        const extraPadding = Math.min(dataStr.length * 3 * charWidthScaleFactor, 30 * charWidthScaleFactor); // 根据文本长度增加额外填充，但最多30像素
                        dataLength += extraPadding;
                    }
                    
                    maxDataLength = Math.max(maxDataLength, dataLength);
                });
                
                // 使用标题和数据的最大长度，加上内边距
                const padding = 20; // 所有列使用相同的内边距
                colTextLengths[i] = Math.max(maxTitleLength, maxDataLength) + padding;
            }
            
            // 辅助函数：估算文本宽度，区分中文和英文字符
            function estimateTextWidth(text, chineseCharWidth, englishCharWidth) {
                let width = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text.charAt(i);
                    // 检查是否为中文字符（Unicode范围）
                    if (/[\u4e00-\u9fa5]/.test(char)) {
                        width += chineseCharWidth;
                    } else if (/[,、，.。:：;；!！?？]/.test(char)) {
                        // 标点符号给予额外宽度
                        width += englishCharWidth * 1.2;
                    } else {
                        width += englishCharWidth;
                    }
                }
                
                // 检查是否包含多个连续的非中文字符（如"社保基金、养老金"）
                if (/[,、，.。:：;；]/.test(text)) {
                    // 有标点符号的文本，给予额外宽度以确保显示
                    width += 20;
                }
                return width;
            }
            
            // 为第三列及以后的列分配宽度，确保最小宽度
            for (let i = 2; i < columns.length; i++) {
                // 确保每列至少有一个最小宽度，第三列和第四列需要更大的最小宽度
                if (i === 2) {
                    // 第三列（行业/概念列）需要更大的最小宽度
                    colWidths[i] = Math.max(colTextLengths[i], 180);
                } else if (i === 3) {
                    // 第四列（机构名称列）可能包含较长文本，给予更大的最小宽度
                    colWidths[i] = Math.max(colTextLengths[i], 200);
                } else if (i === columns.length - 1) {
                    // 最后一列根据字体大小调整最小宽度
                    const widthScaleFactor = lastColumnFontSize / 30; // 字体大小与默认大小(30)的比例
                    const minWidth = 150 * widthScaleFactor;
                    colWidths[i] = Math.max(colTextLengths[i], minWidth);
                } else {
                    // 其他列使用标准最小宽度
                    colWidths[i] = Math.max(colTextLengths[i], 150);
                }
            }
            
            // 4. 计算第二列宽度（填充剩余空间）
            const otherColsWidth = colWidths.reduce((sum, width) => sum + width, 0);
            const secondColWidth = innerWidth - 56 - otherColsWidth;
            colWidths[1] = Math.max(secondColWidth, 150); // 确保第二列有最小宽度
            
            // 5. 计算每列的起始位置
            const colPositions = [];
            let currentPos = padding + 28; // 表格左边缘位置
            
            for (let i = 0; i < columns.length; i++) {
                colPositions[i] = currentPos;
                currentPos += colWidths[i];
            }
            
            // 头部表格背景
            const headerBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            headerBg.setAttribute('x', padding + 28);
            headerBg.setAttribute('y', tableHeaderY);
            headerBg.setAttribute('width', innerWidth - 56);
            headerBg.setAttribute('height', tableHeaderHeight);
            headerBg.setAttribute('fill', 'transparent');
            headerBg.setAttribute('rx', 5);
            headerBg.setAttribute('ry', 5);
            container.appendChild(headerBg);
            
            // 表格头部文字
            for (let i = 0; i < Math.min(columns.length, columnNames.length); i++) {
                const headerText = columnNames[i] || columns[i];
                // 检查是否包含换行符
                const hasLineBreak = headerText.includes('\n');
                const headerLines = hasLineBreak ? headerText.split('\n') : [headerText];
                
                if (hasLineBreak) {
                    // 如果有换行符，为每一行创建单独的文本元素
                    const lineCount = headerLines.length;
                    
                    // 计算多行文本的总高度
                    const totalTextHeight = lineCount * headerLineHeight + 
                                           (lineCount - 1) * headerLineSpacing;
                    
                    // 计算第一行的起始位置 (使整体垂直居中)
                    const startY = tableHeaderY + headerTopPadding;
                    
                    for (let lineIndex = 0; lineIndex < headerLines.length; lineIndex++) {
                        const lineText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        
                        if (i === 0) {
                            if (showCompanyLogos) {
                                // 第一列表头与公司名称文本对齐，显示logo时
                                const logoX = colPositions[i] + 45; // logo中心点x坐标
                                const logoRadius = 35; // logo半径
                                const companyNameX = logoX + logoRadius + 15; // 公司名称文本的x位置
                                lineText.setAttribute('x', companyNameX);
                                lineText.setAttribute('text-anchor', 'start'); // 左对齐
                            } else {
                                // 不显示logo时，第一列表头居中
                                lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                                lineText.setAttribute('text-anchor', 'middle');
                            }
                        } else if (i === columns.length - 1) {
                            // 最后一列右对齐，无论是否为文本列
                            lineText.setAttribute('x', svgWidth - padding - 28 - 10); // 距离右边缘10px
                            lineText.setAttribute('text-anchor', 'end');
                        } else {
                            // 其他列(包括第二列)居中对齐
                            lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                            lineText.setAttribute('text-anchor', 'middle');
                        }
                        
                        // 每一行的Y位置计算：起始位置 + 行号*(行高+行间距) + 行高/2(文字垂直居中)
                        const lineY = startY + lineIndex * (headerLineHeight + headerLineSpacing) + headerLineHeight/2;
                        lineText.setAttribute('y', lineY);
                        lineText.setAttribute('dominant-baseline', 'middle');
                        lineText.setAttribute('font-size', '30'); // 恢复表头字体大小为固定值
                        lineText.setAttribute('font-weight', 'bold');
                        lineText.setAttribute('font-family', 'MiSans-Demibold, sans-serif');
                        lineText.setAttribute('fill', '#333333');
                        lineText.textContent = headerLines[lineIndex];
                        container.appendChild(lineText);
                    }
                } else {
                    // 单行表头处理逻辑 - 保持顶端对齐
                    const lineText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    
                    if (i === 0) {
                        if (showCompanyLogos) {
                            // 第一列表头与公司名称文本对齐，显示logo时
                            const logoX = colPositions[i] + 45; // logo中心点x坐标
                            const logoRadius = 35; // logo半径
                            const companyNameX = logoX + logoRadius + 15; // 公司名称文本的x位置
                            lineText.setAttribute('x', companyNameX);
                            lineText.setAttribute('text-anchor', 'start'); // 左对齐
                        } else {
                            // 不显示logo时，第一列表头居中
                            lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                            lineText.setAttribute('text-anchor', 'middle');
                        }
                    } else if (i === columns.length - 1) {
                        // 最后一列右对齐，无论是否为文本列
                        lineText.setAttribute('x', svgWidth - padding - 28 - 10); // 距离右边缘10px
                        lineText.setAttribute('text-anchor', 'end');
                    } else {
                        // 其他列(包括第二列)居中对齐
                        lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                        lineText.setAttribute('text-anchor', 'middle');
                    }
                    
                    // 单行表头与多行表头的第一行保持位置一致
                    const singleLineY = tableHeaderY + headerTopPadding + headerLineHeight/2;
                    
                    lineText.setAttribute('y', singleLineY);
                    lineText.setAttribute('dominant-baseline', 'middle');
                    lineText.setAttribute('font-size', '30'); // 恢复表头字体大小为固定值
                    lineText.setAttribute('font-weight', 'bold');
                    lineText.setAttribute('font-family', 'MiSans-Demibold, sans-serif');
                    lineText.setAttribute('fill', '#333333');
                    lineText.textContent = headerText;
                    container.appendChild(lineText);
                }
            }
            
            // 计算第二列的最大值用于柱状图比例（如果有第二列的话）
            let maxValue = 0;
            if (columns.length > 1) {
                const secondColumn = columns[1];
                
                // 确保计算数据中的真实最大值
                maxValue = Math.max(...excelData.map(row => {
                    const val = parseFloat(row[secondColumn]);
                    return isNaN(val) ? 0 : val;
                }));
                
                // 如果最大值很小，设置一个合理的最小值以避免柱状图太短
                if (maxValue < 10) {
                    // 向上取整到最接近的整数
                    maxValue = Math.ceil(maxValue);
                }
            }
            
            // 预处理数据列，检查每列是否存在负数
            const columnsWithNegativeValues = {};
            const columnsAllPositive = {};
            const columnsAllNegative = {};
            
            columns.forEach((col, colIdx) => {
                if (colIdx < 2) return; // 只处理第三列及以后
                
                // 检查该列是否存在负数以及是否全为正数或负数
                let hasPositive = false;
                let hasNegative = false;
                
                excelData.forEach(dataRow => {
                    const valueStr = String(dataRow[col]);
                    // 对百分比格式进行特殊处理
                    const numericValue = parseFloat(valueStr.replace('%', ''));
                    if (!isNaN(numericValue)) {
                        if (numericValue > 0) hasPositive = true;
                        if (numericValue < 0) hasNegative = true;
                    }
                });
                
                // 规则1标记 - 只有当列中同时存在正负值时才标记
                columnsWithNegativeValues[col] = hasPositive && hasNegative;
                // 规则2标记 - 记录列是否全为正值或全为负值
                columnsAllPositive[col] = hasPositive && !hasNegative;
                columnsAllNegative[col] = !hasPositive && hasNegative;
            });
            
            // 判断数据行中第三列特殊对齐的条件
            const hasSpecialThirdColAlignment = (() => {
                // 检查是否是四列数据
                if (columns.length !== 4) return false;
                
                // 检查第三列是否为数字
                const thirdColIndex = 2; // 第三列索引
                let numberCount = 0;
                const sampleSize = Math.min(excelData.length, 5);
                for (let i = 0; i < sampleSize; i++) {
                    const value = excelData[i][columns[thirdColIndex]];
                    if (value) {
                        const valueStr = String(value);
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        if (!isNaN(numericValue)) {
                            numberCount++;
                        }
                    }
                }
                return numberCount > sampleSize / 2; // 大部分为数字则视为数字列
            })();
            
            // 存储第三列首行数字的右边界位置（用于其他行对齐）
            let thirdColFirstRowRightBoundary = null;
            
            // 渲染数据行
            excelData.forEach((row, rowIndex) => {
                const rowY = dataY + (rowIndex * (rowHeight + rowSpacing));
                const rowCenterY = rowY + (rowHeight / 2); // 行的垂直中心点
                
                // 创建每行背景，带从左到右的渐变效果
                const rowBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rowBg.setAttribute('x', padding + 28);
                rowBg.setAttribute('y', rowY);
                rowBg.setAttribute('width', innerWidth - 56);
                rowBg.setAttribute('height', rowHeight);
                rowBg.setAttribute('rx', 5);
                rowBg.setAttribute('ry', 5);
                
                // 创建渐变
                const gradientId = `rowGradient-${rowIndex}`;
                const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.setAttribute('id', gradientId);
                gradient.setAttribute('x1', '0%');
                gradient.setAttribute('y1', '0%');
                gradient.setAttribute('x2', '100%');
                gradient.setAttribute('y2', '0%');
                
                // 渐变起点 - 设置的行背景色
                const startColor = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                startColor.setAttribute('offset', '0%');
                startColor.setAttribute('stop-color', rowBgColorDeep || '#f0f7ff');
                
                // 渐变终点 - 使用设置的浅色
                const endColor = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                endColor.setAttribute('offset', '100%');
                endColor.setAttribute('stop-color', rowBgColorLight || '#ffffff');  // 使用用户设置的浅色
                
                gradient.appendChild(startColor);
                gradient.appendChild(endColor);
                
                // 添加渐变到SVG的defs区域
                const defs = container.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!container.querySelector('defs')) {
                    container.appendChild(defs);
                }
                defs.appendChild(gradient);
                
                // 应用渐变到行背景
                rowBg.setAttribute('fill', `url(#${gradientId})`);
                container.appendChild(rowBg);
                
                // 绘制表格单元格数据
                columns.forEach((col, colIndex) => {
                    const colX = colPositions[colIndex]; // 使用预计算的列位置
                    const colWidth = colWidths[colIndex];
                    const value = row[col];
                    
                    // 检查是否为数值和是否为文本
                    const isNumber = !isNaN(parseFloat(value));
                    const valueAsString = String(value).trim();
                    const hasExplicitSign = valueAsString.startsWith('+') || valueAsString.startsWith('-');
                    
                    // 判断是否为最后一列
                    const isLastColumn = colIndex === columns.length - 1;
                    
                    if (colIndex === 0) {
                        // Logo 和公司名称
                        const companyName = value;
                        const logoUrl = companyLogosMap && companyLogosMap.has(companyName) 
                            ? companyLogosMap.get(companyName) 
                            : null;
                        
                        // 计算行的中心点，确保一致的垂直对齐
                        const centerY = rowY + (rowHeight / 2);
                        
                        // 根据showCompanyLogos参数决定是否显示公司Logo
                        if (showCompanyLogos) {
                            // 调整logo位置，使其距离行左边缘有10px的距离
                            const logoX = colX + 45; // 从原来的x + 35调整为x + 45，增加10px的间距
                            
                            // 创建logo的圆形裁剪路径
                            const clipPathId = `company-logo-clip-${rowIndex}`;
                            const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                            clipPath.setAttribute('id', clipPathId);
                            const clipCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            const logoRadius = 35;
                            clipCircle.setAttribute('cx', logoX);
                            clipCircle.setAttribute('cy', centerY); // 使用同一个centerY确保对齐
                            clipCircle.setAttribute('r', logoRadius);
                            clipPath.appendChild(clipCircle);
                            container.appendChild(clipPath);
                            
                            // 添加白色圆底作为logo背景
                            const logoBackground = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            logoBackground.setAttribute('cx', logoX);
                            logoBackground.setAttribute('cy', centerY); // 使用同一个centerY确保对齐
                            logoBackground.setAttribute('r', logoRadius);
                            logoBackground.setAttribute('fill', '#ffffff');
                            logoBackground.setAttribute('stroke', '#eeeeee');
                            logoBackground.setAttribute('stroke-width', '1');
                            container.appendChild(logoBackground);
                            
                            if (logoUrl) {
                                // 使用实际公司logo
                                const companyLogo = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                                const logoSize = logoRadius * 2;
                                companyLogo.setAttribute('x', logoX - logoRadius); // 中心点减去半径
                                companyLogo.setAttribute('y', centerY - logoRadius); // 使用同一个centerY确保对齐
                                companyLogo.setAttribute('width', logoSize);
                                companyLogo.setAttribute('height', logoSize);
                                companyLogo.setAttribute('href', logoUrl);
                                companyLogo.setAttribute('clip-path', `url(#${clipPathId})`);
                                companyLogo.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                                
                                // 添加加载错误处理
                                companyLogo.addEventListener('error', function() {
                                    // 加载失败时不添加任何占位图，直接移除失败的图像元素
                                    this.remove();
                                });
                                
                                container.appendChild(companyLogo);
                            }
                            
                            // 公司名称 - 显示Logo时的位置
                            const companyNameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            companyNameText.setAttribute('x', logoX + logoRadius + 15); // 调整为基于新的logo位置
                            companyNameText.setAttribute('y', centerY); // 使用同一个centerY确保对齐
                            companyNameText.setAttribute('font-size', '36');
                            companyNameText.setAttribute('font-weight', 'bold');
                            companyNameText.setAttribute('font-family', 'MiSans-Semibold, sans-serif');
                            companyNameText.setAttribute('fill', '#333333');
                            companyNameText.setAttribute('dominant-baseline', 'middle'); // 确保垂直居中

                            // 检测是否为3个汉字的公司名称
                            // 假设标准的4字公司名称宽度约为144px(每个汉字约36px)
                            if (/^[\u4e00-\u9fa5]{3}$/.test(companyName)) {
                                // 设置textLength属性，使3个字的名称展示为与4个字相同的宽度
                                companyNameText.setAttribute('textLength', '144');
                                companyNameText.setAttribute('lengthAdjust', 'spacing');
                            }

                            companyNameText.textContent = companyName;
                            container.appendChild(companyNameText);
                        } else {
                            // 不显示Logo时，公司名称靠左对齐
                            const companyNameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            companyNameText.setAttribute('x', colX + 20); // 靠左对齐，留出合适的间距
                            companyNameText.setAttribute('y', centerY); // 使用同一个centerY确保对齐
                            companyNameText.setAttribute('font-size', '36');
                            companyNameText.setAttribute('font-weight', 'bold');
                            companyNameText.setAttribute('font-family', 'MiSans-Semibold, sans-serif');
                            companyNameText.setAttribute('fill', '#333333');
                            companyNameText.setAttribute('dominant-baseline', 'middle'); // 确保垂直居中
                            companyNameText.textContent = companyName;
                            container.appendChild(companyNameText);
                        }
                    } else if (colIndex === 1) {
                        // 第二列：柱状图处理 - 使用剩余空间
                        // 检查是否为数值
                        const numValue = parseFloat(value);
                        
                        if (!isNaN(numValue) && maxValue > 0) {
                            // 柱状图起点位置固定，终点位置基于比例计算
                            const startX = colX + 15;
                            const availWidth = colWidth - 10;
                            const barWidth = (numValue / maxValue) * availWidth;
                            const barHeight = rowHeight;
                            
                            // 柱状图
                            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            bar.setAttribute('x', startX);
                            bar.setAttribute('y', rowCenterY - (barHeight / 2));
                            bar.setAttribute('width', barWidth);
                            bar.setAttribute('height', barHeight);
                            bar.setAttribute('fill', `url(#barGradient)`);
                            container.appendChild(bar);
                            
                            // 数值文本
                            const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            
                            // 判断柱状图宽度，如果足够宽就将数值显示在柱体内部
                            const minWidthForInnerText = 120;
                            let textColor = gradientDeepColor; // 默认使用主题渐变色的深色
                            let textX;
                            
                            if (barWidth >= minWidthForInnerText) {
                                // 柱体足够宽，将文本放在柱体内部靠右侧
                                textX = startX + barWidth - 20; // 距离柱子右侧20px
                                textColor = '#FFFFFF'; // 白色文本
                                valueText.setAttribute('text-anchor', 'end'); // 文本右对齐
                            } else {
                                // 柱体较窄，将文本放在柱体右侧
                                textX = startX + barWidth + 10;
                                // 使用主题渐变色的深色
                                valueText.setAttribute('text-anchor', 'start'); // 文本左对齐
                            }
                            
                            valueText.setAttribute('x', textX);
                            valueText.setAttribute('y', rowCenterY);
                            valueText.setAttribute('font-size', '30');
                            valueText.setAttribute('font-weight', 'bold');
                            valueText.setAttribute('font-family', 'MiSans-Semibold, sans-serif');
                            valueText.setAttribute('fill', textColor);
                            valueText.setAttribute('dominant-baseline', 'middle');
                            valueText.textContent = value;
                            container.appendChild(valueText);
                        } else {
                            // 非数值，直接显示文本
                            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            
                            // 第一行文本居中，其他行与第一行保持左对齐
                            if (rowIndex === 0) {
                                // 首行处理：居中对齐
                                text.setAttribute('x', colX + (colWidth / 2));
                                text.setAttribute('text-anchor', 'middle');
                                text.textContent = value;
                                container.appendChild(text);
                                
                                // 计算并存储首行文本的左边界位置，用于其他行对齐
                                // 创建临时canvas测量文本宽度
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCtx.font = `normal 30px MiSans-Medium, sans-serif`;
                                const textWidth = tempCtx.measureText(value).width;
                                // 计算左边界 = 中心位置 - 文本宽度的一半
                                if (!window.colLeftBoundaries) window.colLeftBoundaries = {};
                                window.colLeftBoundaries[colIndex] = colX + (colWidth / 2) - (textWidth / 2);
                            } else {
                                // 其他行处理：左对齐，并与首行文本左边界对齐
                                const leftBoundary = window.colLeftBoundaries && window.colLeftBoundaries[colIndex];
                                // 如果有保存的左边界，使用它，否则回退到普通居中对齐
                                if (leftBoundary) {
                                    text.setAttribute('x', leftBoundary);
                                    text.setAttribute('text-anchor', 'start');
                                } else {
                                    // 回退到常规居中对齐
                                    text.setAttribute('x', colX + (colWidth / 2));
                                    text.setAttribute('text-anchor', 'middle');
                                }
                                text.textContent = value;
                                container.appendChild(text);
                            }
                            
                            text.setAttribute('y', rowCenterY);
                            text.setAttribute('font-size', '30');
                            text.setAttribute('font-weight', 'normal');
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif');
                            text.setAttribute('fill', '#333333');
                            text.setAttribute('dominant-baseline', 'middle');
                        }
                    } else if (colIndex === 2 && hasSpecialThirdColAlignment) {
                        // 特殊处理：四列数据且第三列是数字的情况
                        // 根据是否为第一行采用不同的对齐方式
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        
                        // 设置文本的基本样式
                        text.setAttribute('font-size', '30');
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 根据内容类型选择不同的字体
                        if (isNumber) {
                            text.setAttribute('font-family', 'MiSans-Semibold, sans-serif'); // 数字使用Semibold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        text.setAttribute('dominant-baseline', 'middle');
                        
                        // 根据数值正负设置颜色和粗细
                        let textColor = '#333333'; // 默认颜色
                        let fontWeight = 'normal'; // 默认字体粗细
                        
                        // 根据选择的颜色规则进行处理
                        if (isNumber) {
                            if (columnsWithNegativeValues[col]) {
                                // 规则1: 列中同时有正有负时，应用颜色区分
                                if (numericValue > 0) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    fontWeight = 'bold'; // 正值显示为粗体
                                } else if (numericValue < 0) {
                                    textColor = '#008000'; // 负值显示绿色
                                }
                            } else if (colorRule === 2) {
                                // 规则2: 即使列全为正值或负值，也应用颜色区分
                                if (numericValue > 0 || columnsAllPositive[col]) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    fontWeight = 'bold'; // 正值显示为粗体
                                } else if (numericValue < 0 || columnsAllNegative[col]) {
                                    textColor = '#008000'; // 负值显示绿色
                                    fontWeight = 'bold'; // 负值也使用粗体
                                }
                            }
                        }
                        
                        text.setAttribute('font-weight', fontWeight);
                        text.setAttribute('fill', textColor);
                        
                        // 检查文本是否包含特殊字符（如逗号、顿号等）
                        const containsSpecialChar = !isNumber && /[、，,]/.test(String(value));
                        
                        if (rowIndex === 0) {
                            // 首行处理：居中对齐
                            text.setAttribute('x', colX + (colWidth / 2));
                            text.setAttribute('y', rowCenterY);
                            text.setAttribute('text-anchor', 'middle');
                            text.textContent = value;
                            container.appendChild(text);
                            
                            // 计算并存储首行数字的右边界位置，用于其他行对齐
                            // 创建临时canvas测量文本宽度
                            const tempCanvas = document.createElement('canvas');
                            const tempCtx = tempCanvas.getContext('2d');
                            tempCtx.font = `${fontWeight} 30px MiSans-Medium, sans-serif`;
                            const textWidth = tempCtx.measureText(value).width;
                            // 计算右边界 = 中心位置 + 文本宽度的一半
                            thirdColFirstRowRightBoundary = colX + (colWidth / 2) + (textWidth / 2);
                        } else {
                            if (containsSpecialChar) {
                                // 对于特殊字符，使用完全居中对齐而不是右对齐
                                text.setAttribute('x', colX + (colWidth / 2));
                                text.setAttribute('text-anchor', 'middle');
                            } else {
                                // 其他行处理：右对齐，并与首行数字右边界对齐
                                text.setAttribute('x', thirdColFirstRowRightBoundary);
                                text.setAttribute('text-anchor', 'end');
                            }
                            text.setAttribute('y', rowCenterY);
                            text.textContent = value;
                            container.appendChild(text);
                        }
                    } else if (colIndex === columns.length - 1) {
                        // 最后一列：无论内容是什么，都右对齐
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        // 设置文本距离右边缘10px
                        text.setAttribute('x', svgWidth - padding - 28 - 10);
                        text.setAttribute('y', rowCenterY);
                        text.setAttribute('text-anchor', 'end');
                        text.setAttribute('font-size', lastColumnFontSize); // 使用滑块控制的字体大小
                        text.setAttribute('font-weight', 'normal');
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 根据内容类型选择不同的字体
                        if (isNumber) {
                            text.setAttribute('font-family', 'MiSans-Semibold, sans-serif'); // 数字使用Semibold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        
                        // 检查是否包含特殊字符，有的话可能需要调整
                        const containsSpecialChar = /[、，,]/.test(valueStr);
                        
                        // 针对特殊字符的内容进行位置微调，稍微向左移动一些
                        if (containsSpecialChar) {
                            text.setAttribute('x', svgWidth - padding - 28 - 20); // 多留出10px的空间
                        }
                        
                        // 根据是否为数值及正负值，设置颜色和字体粗细
                        let textColor = '#333333'; // 默认颜色
                        // 根据选择的颜色规则进行处理
                        if (isNumber) {
                            if (columnsWithNegativeValues[col]) {
                                // 规则1: 列中同时有正有负时，应用颜色区分
                                if (numericValue > 0) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    text.setAttribute('font-weight', 'bold'); // 正值显示为粗体
                                } else if (numericValue < 0) {
                                    textColor = '#008000'; // 负值显示绿色
                                }
                            } else if (colorRule === 2) {
                                // 规则2: 即使列全为正值或负值，也应用颜色区分
                                if (numericValue > 0 || columnsAllPositive[col]) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    text.setAttribute('font-weight', 'bold'); // 正值显示为粗体
                                } else if (numericValue < 0 || columnsAllNegative[col]) {
                                    textColor = '#008000'; // 负值显示绿色
                                    text.setAttribute('font-weight', 'bold'); // 负值也使用粗体
                                }
                            }
                        }

                        text.setAttribute('fill', textColor);
                        text.setAttribute('dominant-baseline', 'middle');
                        text.textContent = value;
                        container.appendChild(text);
                    } else {
                        // 其他列：根据正负显示颜色，居中对齐
                        let textColor = '#333333'; // 默认颜色
                        let fontWeight = 'normal'; // 默认字体粗细
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 先检查该列是否存在负数，只有存在负数的列才根据正负值应用不同颜色
                        if (isNumber && columnsWithNegativeValues[col]) {
                            if (numericValue > 0) {
                                textColor = '#bd2427'; // 正值显示红色
                                fontWeight = 'bold'; // 正值显示为粗体
                            } else if (numericValue < 0) {
                                textColor = '#008000'; // 负值显示绿色
                            }
                        } else if (isNumber && colorRule === 2) {
                            // 规则2: 即使列全为正值或负值，也应用颜色区分
                            if (numericValue > 0 || columnsAllPositive[col]) {
                                textColor = '#bd2427'; // 正值显示红色
                                fontWeight = 'bold'; // 正值显示为粗体
                            } else if (numericValue < 0 || columnsAllNegative[col]) {
                                textColor = '#008000'; // 负值显示绿色
                                fontWeight = 'bold'; // 负值也使用粗体
                            }
                        }
                        
                        // 检查是否包含特殊字符
                        const containsSpecialChar = !isNumber && /[、，,]/.test(valueStr);
                        
                        // 创建文本元素
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        text.setAttribute('x', colX + (colWidth / 2));
                        text.setAttribute('y', rowCenterY);
                        text.setAttribute('text-anchor', 'middle');
                        text.setAttribute('font-size', '30');
                        text.setAttribute('font-weight', fontWeight);
                        // 第三、四列根据内容类型设置不同字体
                        if ((colIndex === 2 || colIndex === 3) && isNumber) {
                            text.setAttribute('font-family', 'MiSans-Semibold, sans-serif'); // 数字使用Semibold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        text.setAttribute('fill', textColor);
                        text.setAttribute('dominant-baseline', 'middle');
                        
                        // 为包含特殊字符的文本提供更多空间
                        if (containsSpecialChar && colTextLengths[colIndex] < estimateTextWidth(valueStr, 30, 15) + 30) {
                            // 如果列宽计算不足以容纳该文本，使用缩小字体的方式
                            const adjustedFontSize = Math.max(parseInt(lastColumnFontSize) - 2, 22);
                            text.setAttribute('font-size', colIndex === columns.length - 1 ? adjustedFontSize : '28');
                        }
                        
                        text.textContent = value;
                        container.appendChild(text);
                    }
                });
            });
        }
        
        // 计算小票底部位置，用于定位版权文案和Logo
        const ticketBottomY = padding + innerHeight;
        
        // 版权文案 - 移到小票区域外部
        const copyrightY_outside = ticketBottomY + 40; // 小票底部下方40px
        const copyrightLines = copyright.split('\n');
        
        // 计算版权文案的中心点，以便与Logo对齐
        const copyrightHeight = copyrightLines.length * 25; // 总高度（每行25px）
        const copyrightCenterY = copyrightY_outside + (copyrightHeight / 2) - 12; // 中心点位置
        
        // 版权文案
        copyrightLines.forEach((line, index) => {
            const copyrightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            copyrightText.setAttribute('x', padding + 28);
            copyrightText.setAttribute('y', copyrightY_outside + (index * 25)); // 每行间距25px
            copyrightText.setAttribute('font-size', '16');
            copyrightText.setAttribute('font-family', 'MiSans-Medium, sans-serif');
            copyrightText.setAttribute('fill', '#ffffff');
            copyrightText.textContent = line;
            container.appendChild(copyrightText);
        });
        
        // 底部Logo - 移到小票区域外部，与版权文案垂直居中对齐
        const logoHeight = 80;
        const bottomLogo = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        bottomLogo.setAttribute('x', svgWidth - padding - 120);
        bottomLogo.setAttribute('y', copyrightCenterY - (logoHeight / 2)); // 基于版权文案中心点对齐
        bottomLogo.setAttribute('width', 80);
        bottomLogo.setAttribute('height', logoHeight);
        bottomLogo.setAttribute('href', 'https://u.thsi.cn/imgsrc/share/525fa634e52929aa7464ecfe940f61e6.png');
        container.appendChild(bottomLogo);
        
        // 添加水印图片 - 不拉伸，需要时重复或裁剪
        const watermarkUrl = 'https://u.thsi.cn/imgsrc/share/f40de4b7b181aa5da31b16121b466b18.png';
        const watermarkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        watermarkGroup.setAttribute('pointer-events', 'none'); // 确保水印不会阻止鼠标事件
        container.appendChild(watermarkGroup);
        
        // 创建一个临时图片元素来获取水印图片的实际高度
        const tempImg = new Image();
        tempImg.onload = function() {
            const watermarkWidth = svgWidth; // 水印宽度与SVG一致
            const watermarkHeight = tempImg.height * (svgWidth / tempImg.width); // 保持宽高比例计算高度
            
            // 计算需要多少张水印图片来覆盖整个SVG高度
            const numWatermarks = Math.ceil(svgHeight / watermarkHeight);
            
            // 创建水印图片并垂直排列
            for (let i = 0; i < numWatermarks; i++) {
                const watermark = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                watermark.setAttribute('x', 0);
                watermark.setAttribute('y', i * watermarkHeight);
                watermark.setAttribute('width', watermarkWidth);
                watermark.setAttribute('height', watermarkHeight);
                watermark.setAttribute('href', watermarkUrl);
                // 创建剪切路径，确保最后一个水印不会超出SVG高度
                if (i === numWatermarks - 1 && (i + 1) * watermarkHeight > svgHeight) {
                    const clipPathId = `watermark-clip-${i}`;
                    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                    clipPath.setAttribute('id', clipPathId);
                    
                    const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    clipRect.setAttribute('x', 0);
                    clipRect.setAttribute('y', i * watermarkHeight);
                    clipRect.setAttribute('width', watermarkWidth);
                    clipRect.setAttribute('height', svgHeight - (i * watermarkHeight));
                    
                    clipPath.appendChild(clipRect);
                    container.appendChild(clipPath);
                    
                    watermark.setAttribute('clip-path', `url(#${clipPathId})`);
                }
                watermarkGroup.appendChild(watermark);
            }
        };
        tempImg.onerror = function() {
            // 加载失败时，添加一个简单的水印
            const watermark = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            watermark.setAttribute('x', 0);
            watermark.setAttribute('y', 0);
            watermark.setAttribute('width', svgWidth);
            watermark.setAttribute('height', svgHeight);
            watermark.setAttribute('href', watermarkUrl);
            watermarkGroup.appendChild(watermark);
        };
        tempImg.src = watermarkUrl;
        
        // 添加下载按钮
        addDownloadButton();
    }
    
    // 添加下载SVG的按钮
    function addDownloadButton() {
        // 检查是否已经存在下载按钮
        if (document.getElementById('downloadBtn')) {
            return;
        }
        
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadBtn';
        downloadBtn.textContent = '下载PNG';
        downloadBtn.style.marginTop = '20px';
        downloadBtn.style.marginLeft = '10px';
        
        // 添加无水印PNG下载按钮
        const downloadNoWatermarkBtn = document.createElement('button');
        downloadNoWatermarkBtn.id = 'downloadNoWatermarkBtn';
        downloadNoWatermarkBtn.textContent = '下载无水印PNG';
        downloadNoWatermarkBtn.style.marginTop = '20px';
        downloadNoWatermarkBtn.style.marginLeft = '10px';
        
        downloadBtn.addEventListener('click', async function() {
            await exportPNG(true); // 导出有水印版本
        });
        
        downloadNoWatermarkBtn.addEventListener('click', async function() {
            await exportPNG(false); // 导出无水印版本
        });
        
        // 添加SVG下载按钮
        const downloadSvgBtn = document.createElement('button');
        downloadSvgBtn.id = 'downloadSvgBtn';
        downloadSvgBtn.textContent = '下载SVG';
        downloadSvgBtn.style.marginTop = '20px';
        downloadSvgBtn.style.marginLeft = '10px';
        
        // 将原来的下载PNG逻辑抽取为独立函数
        async function exportPNG(includeWatermark) {
            // 显示加载提示
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.7)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.textContent = `正在处理${includeWatermark ? '' : '无水印'}图片并准备下载...`;
            document.body.appendChild(loadingDiv);
            
            try {
                // 获取渐变颜色，用于Canvas渲染
                const gradientDeepColor = isValidHexColor(gradientColorDeepHex.value) ? gradientColorDeepHex.value : gradientColorDeep.value;
                const gradientLightColor = isValidHexColor(gradientColorLightHex.value) ? gradientColorLightHex.value : gradientColorLight.value;
                
                // 获取SVG元素和尺寸
                const svgElement = svgContainer;
                const width = parseInt(svgElement.getAttribute('width'));
                const height = parseInt(svgElement.getAttribute('height'));
                
                // 方案：使用Canvas直接渲染SVG和文本
                // 步骤1：创建一个临时的Canvas元素
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                // 步骤2：先绘制SVG背景部分（不含文本）
                // 获取SVG数据不包括文本
                const clonedSvg = svgElement.cloneNode(true);
                
                // 找到所有文本元素并临时隐藏它们
                const allTextElements = clonedSvg.querySelectorAll('text');
                const textData = []; // 存储所有文本信息以便后续渲染
                
                allTextElements.forEach(textElement => {
                    // 处理常规文本元素
                    if (textElement.childElementCount === 0) {
                        // 保存文本信息
                        textData.push({
                            text: textElement.textContent,
                            x: parseFloat(textElement.getAttribute('x') || 0),
                            y: parseFloat(textElement.getAttribute('y') || 0),
                            fill: textElement.getAttribute('fill') || '#000000',
                            fontFamily: textElement.getAttribute('font-family') || 'sans-serif',
                            fontSize: parseFloat(textElement.getAttribute('font-size') || '16'),
                            fontWeight: textElement.getAttribute('font-weight') || 'normal',
                            textAnchor: textElement.getAttribute('text-anchor') || 'start',
                            dominantBaseline: textElement.getAttribute('dominant-baseline') || 'auto',
                            isGradient: textElement.getAttribute('fill') && textElement.getAttribute('fill').startsWith('url(#'),
                            textLength: textElement.getAttribute('textLength') || null,
                            lengthAdjust: textElement.getAttribute('lengthAdjust') || null,
                            // 用于识别公司名称文本
                            isCompanyName: textElement.getAttribute('font-size') === '36' && 
                                          textElement.getAttribute('font-family') && 
                                          textElement.getAttribute('font-family').includes('MiSans-Semibold')
                        });
                    } else {
                        // 处理带有tspan的文本元素
                        const baseX = parseFloat(textElement.getAttribute('x') || 0);
                        const baseY = parseFloat(textElement.getAttribute('y') || 0);
                        const baseFontFamily = textElement.getAttribute('font-family') || 'sans-serif';
                        const baseFontSize = parseFloat(textElement.getAttribute('font-size') || '16');
                        const baseFontWeight = textElement.getAttribute('font-weight') || 'normal';
                        const baseTextAnchor = textElement.getAttribute('text-anchor') || 'start';
                        const baseDominantBaseline = textElement.getAttribute('dominant-baseline') || 'auto';
                        
                        // 计算tspan的水平位置
                        let currentX = baseX;
                        
                        // 添加所有tspan子元素
                        Array.from(textElement.children).forEach((tspan, index) => {
                            if (tspan.tagName.toLowerCase() === 'tspan') {
                                // 添加tspan的文本信息
                                const tspanText = tspan.textContent;
                                
                                textData.push({
                                    text: tspanText,
                                    x: currentX,
                                    y: baseY,
                                    fill: tspan.getAttribute('fill') || textElement.getAttribute('fill') || '#000000',
                                    fontFamily: baseFontFamily,
                                    fontSize: baseFontSize,
                                    fontWeight: baseFontWeight,
                                    textAnchor: 'start', // 强制为左对齐，因为我们手动计算位置
                                    dominantBaseline: baseDominantBaseline,
                                    isGradient: tspan.getAttribute('fill') && tspan.getAttribute('fill').startsWith('url(#')
                                });
                                
                                // 计算这段文本的宽度，用于更新下一个tspan的起始位置
                                // 为计算宽度创建临时画布
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCtx.font = `${baseFontWeight} ${baseFontSize}px ${baseFontFamily}`;
                                const textWidth = tempCtx.measureText(tspanText).width;
                                
                                // 更新下一个tspan的起始X坐标
                                currentX += textWidth;
                            }
                        });
                    }
                    
                    // 临时移除文本元素
                    textElement.style.display = 'none';
                });

                // 如果不包含水印，移除水印元素
                if (!includeWatermark) {
                    const watermarkGroups = clonedSvg.querySelectorAll('g[pointer-events="none"]');
                    watermarkGroups.forEach(group => {
                        group.parentNode.removeChild(group);
                    });
                    
                    // 移除所有水印相关的图片元素
                    const watermarkImages = clonedSvg.querySelectorAll('image[href*="f40de4b7b181aa5da31b16121b466b18"]');
                    watermarkImages.forEach(img => {
                        img.parentNode.removeChild(img);
                    });
                }
                
                // 获取不含文本的SVG数据
                const svgData = new XMLSerializer().serializeToString(clonedSvg);
                const processedSvgData = await inlineSVGString(svgData);
                
                // 将处理后的SVG转换为图像对象
                const svgImage = new Image();
                await new Promise((resolve, reject) => {
                    svgImage.onload = resolve;
                    svgImage.onerror = reject;
                    svgImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(processedSvgData);
                });
                
                // 步骤3：在Canvas上绘制SVG背景
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(svgImage, 0, 0, width, height);
                
                // 步骤4：使用Canvas API手动绘制所有文本
                // 先预加载字体确保可用
                await document.fonts.ready; // 等待所有字体加载
                
                // 手动绘制所有文本
                textData.forEach(text => {
                    // 设置字体样式
                    const fontStyle = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
                    ctx.font = fontStyle;
                    
                    // 处理填充颜色
                    if (text.isGradient) {
                        // 处理渐变引用
                        if (text.fill.includes('subtitleGradient')) {
                            // 创建副标题的渐变(从上到下)
                            const gradient = ctx.createLinearGradient(0, text.y - text.fontSize, 0, text.y + 10);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else if (text.fill.includes('barGradient')) {
                            // 创建柱状图的渐变(从右到左)
                            const gradient = ctx.createLinearGradient(text.x + 50, 0, text.x - 50, 0);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else {
                            // 默认使用深色
                            ctx.fillStyle = gradientDeepColor;
                        }
                    } else {
                        // 使用常规填充颜色
                        ctx.fillStyle = text.fill;
                    }
                    
                    ctx.textBaseline = text.dominantBaseline === 'middle' ? 'middle' : 'alphabetic';
                    
                    // 计算文本位置（根据textAnchor调整）
                    let x = text.x;
                    if (text.textAnchor === 'middle') {
                        ctx.textAlign = 'center';
                    } else if (text.textAnchor === 'end') {
                        ctx.textAlign = 'right';
                    } else {
                        ctx.textAlign = 'left';
                    }
                    
                    // 绘制文本
                    if (text.isCompanyName && /^[\u4e00-\u9fa5]{3}$/.test(text.text)) {
                        // 处理三字公司名称
                        // 假设四字公司名称宽度约为144px
                        const targetWidth = 144;
                        // 测量当前文本实际宽度
                        const actualWidth = ctx.measureText(text.text).width;
                        // 计算需要的字符间距
                        const charSpacing = (targetWidth - actualWidth) / 2; // 两个字符间隙
                        
                        // 分别绘制每个字符，给予适当间距
                        const chars = text.text.split('');
                        let currentX = text.x;
                        
                        if (text.textAnchor === 'middle') {
                            // 如果是居中对齐，需要调整起始位置
                            currentX = text.x - (targetWidth / 2);
                        } else if (text.textAnchor === 'end') {
                            // 如果是右对齐，需要调整起始位置
                            currentX = text.x - targetWidth;
                        }
                        
                        chars.forEach((char, index) => {
                            const charWidth = ctx.measureText(char).width;
                            if (index > 0) {
                                // 添加额外的间距（仅在字符之间）
                                currentX += charSpacing;
                            }
                            ctx.fillText(char, currentX, text.y);
                            currentX += charWidth;
                        });
                    } else {
                        // 正常绘制文本
                        ctx.fillText(text.text, x, text.y);
                    }
                });
                
                // 步骤5：转换Canvas为PNG并下载
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = includeWatermark ? 'F10掘金信息图.png' : 'F10掘金信息图_无水印.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                document.body.removeChild(loadingDiv);
            } catch (error) {
                console.error('下载过程中出错:', error);
                document.body.removeChild(loadingDiv);
                alert(`生成${includeWatermark ? '' : '无水印'}图像时出错，请重试`);
            }
        }
        
        downloadSvgBtn.addEventListener('click', async function() {
            // 显示加载提示
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.7)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.textContent = '正在处理图片并准备下载...';
            document.body.appendChild(loadingDiv);
            
            try {
                // 添加字体转换为Base64编码的函数
                async function fontToBase64(fontUrl) {
                    try {
                        const response = await fetch(fontUrl);
                        if (!response.ok) {
                            throw new Error(`无法加载字体: ${fontUrl}`);
                        }
                        const arrayBuffer = await response.arrayBuffer();
                        const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                        return `data:font/ttf;base64,${base64}`;
                    } catch (error) {
                        console.error('转换字体为Base64时出错:', error);
                        return null;
                    }
                }
                
                // 获取原始SVG
                const svgElement = svgContainer;
                
                // 创建SVG克隆以避免修改原始SVG
                const clonedSvg = svgElement.cloneNode(true);
                
                // 获取或创建defs元素
                const defs = clonedSvg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!clonedSvg.querySelector('defs')) {
                    clonedSvg.appendChild(defs);
                }
                
                // 添加字体样式标签
                const styleTag = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                
                // 尝试将字体转换为Base64数据URI
                let style = '';
                try {
                    // 这里可以根据需要添加内联字体
                    const boldFontUrl = 'MiSans/MiSans-Bold.ttf';
                    const demiBoldFontUrl = 'MiSans/MiSans-Demibold.ttf';
                    const semiBoldFontUrl = 'MiSans/MiSans-Semibold.ttf';
                    const mediumFontUrl = 'MiSans/MiSans-Medium.ttf';
                    
                    // 转换字体为Base64（如果可能）
                    const boldBase64 = await fontToBase64(boldFontUrl);
                    const demiBoldBase64 = await fontToBase64(demiBoldFontUrl);
                    const semiBoldBase64 = await fontToBase64(semiBoldFontUrl);
                    const mediumBase64 = await fontToBase64(mediumFontUrl);
                    
                    // 创建包含内联字体的样式
                    style = `
                        @font-face {
                            font-family: 'MiSans-Bold';
                            src: ${boldBase64 ? `url('${boldBase64}')` : `url('${boldFontUrl}')`} format('truetype');
                            font-weight: 700;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Demibold';
                            src: ${demiBoldBase64 ? `url('${demiBoldBase64}')` : `url('${demiBoldFontUrl}')`} format('truetype');
                            font-weight: 600;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Semibold';
                            src: ${semiBoldBase64 ? `url('${semiBoldBase64}')` : `url('${semiBoldFontUrl}')`} format('truetype');
                            font-weight: 600;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Medium';
                            src: ${mediumBase64 ? `url('${mediumBase64}')` : `url('${mediumFontUrl}')`} format('truetype');
                            font-weight: 500;
                            font-style: normal;
                            font-display: swap;
                        }
                    `;
                } catch (error) {
                    console.error('内联字体时出错:', error);
                    // 使用普通的字体引用作为备选
                    style = `
                        @font-face {
                            font-family: 'MiSans-Bold';
                            src: url('MiSans/MiSans-Bold.ttf') format('truetype');
                            font-weight: 700;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Demibold';
                            src: url('MiSans/MiSans-Demibold.ttf') format('truetype');
                            font-weight: 600;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Semibold';
                            src: url('MiSans/MiSans-Semibold.ttf') format('truetype');
                            font-weight: 600;
                            font-style: normal;
                            font-display: swap;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Medium';
                            src: url('MiSans/MiSans-Medium.ttf') format('truetype');
                            font-weight: 500;
                            font-style: normal;
                            font-display: swap;
                        }
                    `;
                }
                
                styleTag.textContent = style;
                defs.appendChild(styleTag);
                
                // 获取SVG数据
                const svgData = new XMLSerializer().serializeToString(clonedSvg);
                
                // 内联SVG中的所有图片
                const processedSvgData = await inlineSVGString(svgData);
                
                // 创建下载链接
                const svgBlob = new Blob([processedSvgData], {type: 'image/svg+xml;charset=utf-8'});
                const url = URL.createObjectURL(svgBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'F10掘金信息图.svg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // 移除加载提示
                document.body.removeChild(loadingDiv);
            } catch (error) {
                console.error('下载SVG时出错:', error);
                document.body.removeChild(loadingDiv);
                alert('生成SVG时出错，请重试');
            }
        });
        
        const previewSection = document.querySelector('.preview-section');
        previewSection.appendChild(downloadBtn);
        previewSection.appendChild(downloadNoWatermarkBtn);
        previewSection.appendChild(downloadSvgBtn);
    }
});