import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll();

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  async update(req, res) {
    const courier = await Courier.findOne({
      where: { id: req.params.id },
    });

    if (!courier) {
      return res.status(400).json({ error: 'Courier alredy exists' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const rec = await courier.update(req.body);

    return res.json(rec);
  }
}

export default new CourierController();
