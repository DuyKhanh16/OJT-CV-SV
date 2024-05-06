import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateAddressCompanyDto, UpdateInfoCompanyDto } from './dto/create-company.dto';
import { AuthGuard } from '../guard/auth.guard';
require('dotenv').config();

@Controller('api/v2/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}


  @Get("getInfor")
  @UseGuards(AuthGuard)
  async findOne(@Res() res,@Req() req) {
    // console.log(req.account.email)
    try {
      const result = await this.companiesService.getInfor(req.account.email);
      res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      res.status(400).json({message:error})
    }
  }



  @Get("getAll")
  async findAll(@Res() res) {
    const result = await this.companiesService.findAll();

    res.status(200).json({ 
      message:"success",
      data:result
     });
  }
  @Get("getbrandcompany/:id")
  async getbrandcompany(@Res() res, @Req() req,@Param("id") id) {
    console.log(id,"đã ăn vào đây")
    try {
      
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

  // Update thông tin company
  @Patch("update-info/:id")
 async updateInfoCompany(@Body() createCompanyDto: any,@Param("id") id,@Res() res) {
  // console.log(createCompanyDto,id,"đã ăn vào đây")
    try {
      await this.companiesService.updateInfoCompany(id,createCompanyDto);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
      
    }
  }
  // tạo địa chi cho company
  @Post("create-address/:id")
  async createNewAddress(@Body() createAddressCompanyDto:CreateAddressCompanyDto, @Param("id") id, @Res() res) {
    // console.log(createAddressCompanyDto,id,"đã ăn vào đây")
    const {address} = createAddressCompanyDto
    try {
      await this.companiesService.createNewAddress(id,address);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }
  
  // Tạo chi nhánh cho company
  // @Post("create-address-company")
  // async createAddressCompany(@Body() createAddressCompanyDto:CreateAddressCompanyDto, @Res() res) {
  //   try {
  //     await this.companiesService.createNewAddressCompany(createAddressCompanyDto);
  //     res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(process.env.STATUS_FAIL).json({ message: error.message });
  //   }
  // }
  @Delete("delete-address-company/:id")
  async deleteAddressCompany(@Param("id") id, @Res() res) {
    console.log("12311111111111111111111111111111111111111111111111111111111111111",id)
    try {
      await this.companiesService.deleteAddressCompany(id);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }


  @Get("getInfoCompanyById/:id")
  async getInfoCompanyById(@Param("id") id: string, @Res() res) {
    try {
      const result = await this.companiesService.getInfoCompanyById(id);
      res.status(200).json({ 
        message:"success",
        data:result
       });
    } catch (error) {
      res.status(400).json({message:error})
    }

}

// update địa chỉ chi nhánh công ty
@Patch("update-address/:id")
async updateAddress(@Body() createAddressCompanyDto:any, @Param("id") id, @Res() res) {
  try {
    const result = await this.companiesService.updateAdress(createAddressCompanyDto,id);
    res.status(200).json({
      message:"success",
      data:result
    })
  } catch (error) {
    res.status(400).json({message:error})
    
  }
  }
  //  lấy  danh sách flow company
  @Get("flow-company")
  @UseGuards(AuthGuard)
  async flowCompany(@Req() req, @Res() res:any, @Query("company_id") company_id:any) {
    try {
      const result = await this.companiesService.flowCompany(req.account.email,company_id);
      
      res.status(process.env.STATUS_SUCCESS).json({ 
        message:process.env.SUCCESS,
        data:result,
       });
    } catch (error) {
      res.status(400).json({message:error})
    }
  }
  
  // tạo flow công ty
  @Post("flow/:id")
  @UseGuards(AuthGuard)
  async candidateFlow(@Req() req, @Res() res, @Param("id") id) {
    try {

      await this.companiesService.candidateFlow(req.account.email,id);
      res.status(process.env.STATUS_CREATR_OK).json({ message: process.env.SUCCESS });
    } catch (error) {
      console.log(error);
      res.status(process.env.STATUS_FAIL).json({ message: error.message });
    }
  }
}
